import { Alert, AlertTitle, Skeleton } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { createStripeSecretKey } from "../../store/slices/authSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const { clientSecret } = useSelector((state) => state.auth);

  const { totalPrice } = useSelector((state) => state.carts);

  const { isLoading } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const {user, selectedUserAddress} = useSelector(state => state.auth);

  useEffect(() => {
    if (!clientSecret) {
      const payload = {
        amount : totalPrice *100,
        currency : "INR",
        name: user.username,
        email: user.email,
        address: selectedUserAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test:"1"
        }
      }
      dispatch(createStripeSecretKey({payload}));
    }
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className="max-w-lg  mx-auto">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
