import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import SetQuantity from "./setQuantity";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseCartQuantity,
  removeCartItems,
} from "../../store/slices/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";

const ItemContent = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const handleIncrease = (cartItems) => {
    console.log("inside 3");
    const payload = {
      cartItems,
      currentQuantity,
      setCurrentQuantity,
    };

    dispatch(increaseCartQuantity(payload));
  };

  const handlDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      const tempCurrentQuantity = currentQuantity - 1;
      const payload = {
        cartItems,
        currentQuantity: tempCurrentQuantity,
      };
      setCurrentQuantity(tempCurrentQuantity);
      dispatch(decreaseQuantity(payload));
    }
  };

  const handleRemove = (cartItem) => {
    dispatch(removeCartItems(cartItem));
  };

  return (
    <>
      <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
        <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
          <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
            <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
              {truncateText(productName)}
            </h3>
          </div>
          <div className="md:w-36 sm:w-24 w-12">
            <img
              src={image}
              alt={productName}
              className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
            />
            <div className="flex items-start gap-5 mt-3">
              <button
                className="flex items-center font-semibold space-x-2 px-4 py-1 text-sx border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                onClick={() =>
                  handleRemove({
                    productId,
                    productName,
                    image,
                    description,
                    quantity,
                    price,
                    discount,
                    specialPrice,
                  })
                }
              >
                <FaTrash size={16} className="text-rose-600" />
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
          {formatPrice(Number(specialPrice))}
        </div>
        <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
          <SetQuantity
            quantity={currentQuantity}
            cardCounter={true}
            handelQtyIncrease={() => {
              handleIncrease({
                productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              });
            }}
            handleQtyDecrease={() => {
              handlDecrease({
                productId,
                productName,
                image,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              });
            }}
          />
        </div>
        <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
          {formatPrice(Number(currentQuantity) * Number(specialPrice))}
        </div>
      </div>
    </>
  );
};

export default ItemContent;
