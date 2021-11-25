import React, { useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

export default function Paypal (props) {
  const paypal = useRef();

  const h = useHistory();

  const handleChange = event => {
    props.onchange(event);
}

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Consulta de TherapyTime",
                amount: {
                  currency_code: "USD",
                  value: 20.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          handleChange();
            h.push('/')
        },
        onError: (err) => {
          console.log(err);
          toast("¡Pago declinado! Intente nuevamente");
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}