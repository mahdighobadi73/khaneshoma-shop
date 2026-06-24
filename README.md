# khaneshoma-shop

این پروژه یک فروشگاه آنلاین ساده با React، Vite و Express است. در این پروژه:

- از `react-router-dom` برای ناوبری استفاده می‌شود.
- سبد خرید در `localStorage` ذخیره می‌شود.
- سرور Express با مسیرهای محصولات و پرداخت mock پیاده‌سازی شده است.

## اجرای پروژه

1. در ریشه پروژه `npm install` را اجرا کنید.
2. در پوشه `server` نیز `npm install` را اجرا کنید.
3. در پوشه `server` `npm run dev` و در پوشه ریشه `npm run dev` را اجرا کنید.

## مسیرهای API

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/payment/request`
- `POST /api/payment/verify`
