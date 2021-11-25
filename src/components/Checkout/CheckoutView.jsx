import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JzM8sGcnP0GXEvToOr1569UcdQkKOVYJe1HcwUoqC2jxid2eL8CvMSEXtLkIUEf3jE1L1NvDjPJ9ealMpxyv9Xs00K17O2zSH');

const CheckoutView = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51JzM8sGcnP0GXEvTU1PfH3Qv7bk2KrkIVyevaUfvPt5PKCfXFqeRkAW5luOH5bhN6U2jciXdDUgqRJS3D9qXUp7s00hO1lxKds',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};


export default CheckoutView;