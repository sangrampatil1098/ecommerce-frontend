import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddresses } from "../../store/slices/addressThunk";
import toast from "react-hot-toast";
import Skeleton from "../shared/Skeleton";
import ErrorPage from "../shared/ErrorPage";
import Paymentmethod from "./Paymentmethod";
import OrderSummary from "./OrderSummary";
import StripePayment from "./StripePayment";
import PaypalPayment from "./PaypalPayment";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];
  const dispatch = useDispatch();

  const { address, selectedUserAddress } = useSelector((state) => state.auth);

  const { cart, totalPrice } = useSelector((state) => state.carts);

  const { isLoading, errorMessage } = useSelector((state) => state.common);

  const { paymentMethod } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, []);

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserAddress) {
      toast.error("Please select checkout address before proceeding");
      return;
    }
    if (activeStep === 1 && !paymentMethod) {
      toast.error("Please select payment before proceeding");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, idx) => {
          return (
            <Step key={idx}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5 flex items-center justify-center">
          <Skeleton />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}
          {activeStep === 1 && <Paymentmethod />}
          {activeStep === 2 && (
            <OrderSummary
              totalPrice={totalPrice}
              cart={cart}
              address={selectedUserAddress}
              paymentMethod={paymentMethod}
            />
          )}
          {activeStep === 3 && (
            <>
              {paymentMethod === "Stripe" ? (
                <StripePayment />
              ) : (
                <PaypalPayment />
              )}
            </>
          )}
        </div>
      )}

      <div
        className="flex justify-between items-center px-4 fixed z-0 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200"
        style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}
      >
        <Button
          onClick={handleBack}
          variant="outlines"
          disabled={activeStep === 0}
        >
          Back
        </Button>
        {activeStep !== steps.length - 1 && (
          <button
            disabled={
              activeStep === 0
                ? !selectedUserAddress
                : activeStep === 1
                ? !paymentMethod
                : false
            }
            className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white ${
              (activeStep === 0 && !selectedUserAddress) ||
              (activeStep === 1 && !paymentMethod)
                ? "opacity-60"
                : ""
            }`}
            onClick={handleNext}
          >
            Proceed
          </button>
        )}
      </div>
      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;
