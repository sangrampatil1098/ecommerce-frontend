import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserCart, setPaymentMethod } from "../../store/slices/paymentMethodSlice";

const Paymentmethod = () => {
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);

  console.log("Paymentmethod",Paymentmethod)

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0 && !cartId) {
      const sendCartItems = cart.map((item) => {
        return {
            productId: item.productId,
            quantity: item.quantity
        };
      });
      dispatch(createUserCart({sendCartItems}))
    }
  },[dispatch, cart, cartId]);

  const paymentMethodHandler = (paymentMethod) => {
    dispatch(setPaymentMethod(paymentMethod));
  };
  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="Payment Mehod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio color="primary" className="text-gray-700" />}
            label="Stripe"
            className="text-gray-700"
          />
          <FormControlLabel
            value="Paypal"
            control={<Radio color="primary" className="text-gray-700" />}
            label="Paypal"
            className="text-gray-700"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Paymentmethod;
