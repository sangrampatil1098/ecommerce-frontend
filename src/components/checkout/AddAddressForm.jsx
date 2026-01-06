import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InputField from "../shared/InputField";
import { addUpdateUserAddress } from "../../store/slices/addressThunk";

const AddAddressForm = ({ selectedAddress, setOpenAddressModal }) => {
  const { isLoading } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (payload) => {
    dispatch(
      addUpdateUserAddress({
        payload,
        addressId: selectedAddress.addressId,
        setOpenAddressModal,
      })
    );
  };

  useEffect(() => {
    if (selectedAddress.addressId) {
      setValue("buildingName", selectedAddress.buildingName);
      setValue("city", selectedAddress.city);
      setValue("street", selectedAddress.street);
      setValue("state", selectedAddress.state);
      setValue("country", selectedAddress.country);
      setValue("pincode", selectedAddress.pincode);
    }
  }, [selectedAddress]);

  return (
    <div className="">
      <form className="" onSubmit={handleSubmit(onSaveAddressHandler)}>
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          <h2 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            {!selectedAddress.addressId ? " Add Address" : "Update Address"}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required={true}
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter your Building Name"
            register={register}
            errors={errors}
          />
          <InputField
            label="City"
            required={true}
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter your City"
            register={register}
            errors={errors}
          />
          <InputField
            label="State"
            required={true}
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter your State"
            register={register}
            errors={errors}
          />
          <InputField
            label="Pincode"
            required={true}
            id="pincode"
            type="text"
            message="*Pincode is required"
            placeholder="Enter your Pincode"
            register={register}
            errors={errors}
          />

          <InputField
            label="Street"
            required={true}
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter your Street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required={true}
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter your Country"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={isLoading}
          className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
          type="submit"
        >
          {isLoading ? (
            <p className="flex items-center justify-center gap-2">
              <RotatingLines
                visible={true}
                height="20"
                width="20"
                color="white"
                // strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />{" "}
              Loading...
            </p>
          ) : (
            <p>Save</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
