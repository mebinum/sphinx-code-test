import React from "react";
import { Dialog, Transition } from "@headlessui/react";

type ErrorModalType = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
};

const ErrorModal = ({ isOpen, onClose, errorMessage }: ErrorModalType) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <Dialog.Title className="text-lg font-medium mb-4">
              Error
            </Dialog.Title>
            <Dialog.Description>{errorMessage}</Dialog.Description>

            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorModal;
