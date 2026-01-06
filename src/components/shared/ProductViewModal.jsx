import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import { useState } from "react";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";

const ProductViewModal = ({ isOpen, setIsOpen, product, isAvailable }) => {
  const { productName, image, description, price, specialPrice } = product;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white rounded-lg shadow-2xl h-[600px] overflow-y-auto">
            {image && (
              <div className="flex justify-center aspect-[3/2]">
                <img src={image} alt={productName} />
              </div>
            )}
            <div className="px-6 pt-4 pb-2 mb-0">
              <DialogTitle
                as="h3"
                className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-2"
              >
                {productName}
              </DialogTitle>
              <div className="space-y-2 text-gray-700 pb-4">
                <div className="flex items-center justify-between">
                  {specialPrice ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="text-xl font-bold text-slate-700">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-slate-700">
                      ${Number(price).toFixed(2)}
                    </span>
                  )}
                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Out-Of-Stock"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>
                <Divider />
                <p>{description}</p>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {" "}
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ProductViewModal;
