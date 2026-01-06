import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const PaypalPayment = () => {
  return (
    <div className="h-80 flex items-center justify-center">
      <Alert severity="warning" style = {{width:"400px"}}>
        <AlertTitle>Paypal Unavailable</AlertTitle>
        Paypal is unvailable. Please try some other payment method
      </Alert>{" "}
    </div>
  );
};

export default PaypalPayment;
