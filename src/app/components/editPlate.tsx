import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import WellPlate from "./wellPlate";
import { WellData, AssayPlate } from "../models";

type EditPlateType = {
  plate: AssayPlate;
  isModalOpen: boolean;
  onPlateChanged: (data: AssayPlate) => void;
  handleClose: () => void;
};

export default function EditPlate({
  plate,
  isModalOpen,
  handleClose,
  onPlateChanged,
}: EditPlateType) {
  const [plateWells, setPlateWells] = useState<WellData>();
  const handlePlateSaved = () => {
    onPlateChanged({
      ...plate,
      wells: plateWells,
    });
    handleClose();
  };

  const handleWellChanged = (data: WellData) => {
    setPlateWells(data);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={handleClose}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  style={{ minWidth: "80vw" }}
                  className="inline-block w-screen max-w-md p-6 my-8 overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                >
                  <Dialog.Panel className="w-full max-w-sm rounded bg-white">
                    <Dialog.Title
                      as="h2"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit Assay Plate:{" "}
                      <span className="underline decoration-indigo-500 leading-8">
                        {plate.name}
                      </span>
                    </Dialog.Title>

                    <div className="my-8 w-[70vw]">
                      <WellPlate
                        dimension={plate.dimension}
                        wells={plate.wells}
                        onWellChanged={handleWellChanged}
                      />
                    </div>
                    <div className="w-[70vw] flex gap-x-3 border-t border-gray-900/10 py-4 ">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 border border-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handlePlateSaved}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
