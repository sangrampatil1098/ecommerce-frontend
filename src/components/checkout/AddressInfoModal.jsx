import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const AddressInfoModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="relative w-full max-w-md mx-auto transform  overflow-hidden bg-white rounded-lg shadow-xl transition-all max-h-full overflow-scroll">
          <div className="py-6 px-6">{children}</div>
          <div className="flex justify-end gap-4 absolute right-4 top-2">
            <button onClick={()=>setIsOpen(false)} type="button">
              <FaTimes className="text-slate-700" size={25}/>
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddressInfoModal;
