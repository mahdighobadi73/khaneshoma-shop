import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentVerify () {

  const [ searchParams ] = useSearchParams();
  const [ status, setStatus ] = useState( "loading" );

  useEffect( () => {

    const verify = async () => {

      const authority = searchParams.get( "Authority" );
      const statusParam = searchParams.get( "Status" );

      const res = await fetch( "http://localhost:5000/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          authority,
          status: statusParam
        } )
      } );

      const data = await res.json();

      if ( !res.ok ) {
        setStatus( "failed" );
        return;
      }

      if ( data.success ) {
        setStatus( "success" );
      } else {
        setStatus( "failed" );
      }

    };

    verify();

  }, [] );

  if ( status === "loading" ) return <p>در حال بررسی پرداخت...</p>;
  if ( status === "success" ) return <h2>✅ پرداخت با موفقیت انجام شد</h2>;
  return <h2>❌ پرداخت ناموفق بود</h2>;
}
