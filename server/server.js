require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 5000;
const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
    cors({
        origin: CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());

/**
 * In-memory order store
 * For production use database (MongoDB / PostgreSQL)
 */
const orders = new Map();

/**
 * Helper: create a unique order id
 */
function generateOrderId() {
    return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

/**
 * POST /api/payments/request
 * body: { amount, description, customer, items }
 */
app.post("/api/payments/request", async (req, res) => {
    try {
        const { amount, description, customer, items } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "مبلغ پرداخت معتبر نیست"
            });
        }

        if (!MERCHANT_ID) {
            return res.status(500).json({
                success: false,
                message: "Merchant ID تنظیم نشده است"
            });
        }

        const orderId = generateOrderId();

        // Save temporary order
        orders.set(orderId, {
            orderId,
            amount,
            description: description || "خرید از فروشگاه",
            customer: customer || {},
            items: items || [],
            status: "pending",
            createdAt: new Date().toISOString(),
            authority: null,
            refId: null
        });

        const callbackUrl = `${CLIENT_URL}/payment-verify?orderId=${orderId}`;

        const response = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/request.json",
            {
                merchant_id: MERCHANT_ID,
                amount,
                callback_url: callbackUrl,
                description: description || "خرید از فروشگاه",
                metadata: {
                    mobile: customer?.phone || "",
                    email: customer?.email || ""
                }
            }
        );

        const data = response.data;

        if (data.data && data.data.code === 100) {
            const authority = data.data.authority;

            const order = orders.get(orderId);
            if (order) {
                order.authority = authority;
                orders.set(orderId, order);
            }

            return res.json({
                success: true,
                orderId,
                authority,
                paymentUrl: `https://www.zarinpal.com/pg/StartPay/${authority}`
            });
        }

        return res.status(400).json({
            success: false,
            message: "درخواست پرداخت ناموفق بود",
            zarinpal: data
        });
    } catch (error) {
        console.error(
            "Payment request error:",
            error?.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "خطا در ایجاد درخواست پرداخت"
        });
    }
});

/**
 * POST /api/payments/verify
 * body: { orderId, Status, Authority }
 */
app.post("/api/payments/verify", async (req, res) => {
    try {
        const { orderId, Status, Authority } = req.body;

        const order = orders.get(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "سفارش پیدا نشد"
            });
        }

        // زرین‌پال در callback status را ارسال می‌کند
        if (Status !== "OK") {
            order.status = "failed";
            orders.set(orderId, order);

            return res.json({
                success: false,
                message: "پرداخت توسط کاربر لغو شد یا ناموفق بود"
            });
        }

        // اگر authority از query آمده و در order ذخیره نشده، use callback value
        const authorityToVerify = Authority || order.authority;

        if (!authorityToVerify) {
            return res.status(400).json({
                success: false,
                message: "Authority معتبر نیست"
            });
        }

        const response = await axios.post(
            "https://api.zarinpal.com/pg/v4/payment/verify.json",
            {
                merchant_id: MERCHANT_ID,
                amount: order.amount,
                authority: authorityToVerify
            }
        );

        const data = response.data;

        if (data.data && data.data.code === 100) {
            order.status = "paid";
            order.refId = data.data.ref_id;
            order.paidAt = new Date().toISOString();
            orders.set(orderId, order);

            return res.json({
                success: true,
                message: "پرداخت موفق",
                refId: data.data.ref_id,
                orderId,
                amount: order.amount
            });
        }

        order.status = "failed";
        orders.set(orderId, order);

        return res.status(400).json({
            success: false,
            message: "تأیید پرداخت ناموفق بود",
            zarinpal: data
        });
    } catch (error) {
        console.error(
            "Payment verify error:",
            error?.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "خطا در تأیید پرداخت"
        });
    }
});

/**
 * GET /api/orders/:orderId
 * For debugging / front display
 */
app.get("/api/orders/:orderId", (req, res) => {
    const order = orders.get(req.params.orderId);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "سفارش پیدا نشد"
        });
    }

    res.json({
        success: true,
        order
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
