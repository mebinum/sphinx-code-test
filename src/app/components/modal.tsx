import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Well, WellType } from "../models";
import { generateName } from "../utils";

type ModalType = {
  isModalOpen: boolean;
  onSubmit: (data: WellType) => void;
  handleClose: () => void;
};

function ModalComponent({ isModalOpen, onSubmit, handleClose }: ModalType) {
  let [defaultName, setDefaultName] = useState(generateName());

  const methods = useForm<WellType>({
    defaultValues: {
      plateType: "",
    },
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(undefined, {});
      setDefaultName(generateName());
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 bg-gray-50"
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Create Assay Plate
                  </Dialog.Title>

                  <div className="mt-5 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <FormProvider {...methods}>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                      >
                        <div className="px-4 py-6 sm:p-8">
                          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="plateName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Plate name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  required
                                  value={defaultName}
                                  id="plateName"
                                  {...register("plateName")}
                                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                                <input
                                  type="hidden"
                                  id="plateId"
                                  {...register("plateId")}
                                  value={uuidv4()}
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="plateType"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Plate Type
                              </label>
                              <div className="mt-2">
                                <select
                                  required
                                  {...register("plateType")}
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option value="">Select Plate Type</option>
                                  <option value="96">
                                    96-well plate (12x8)
                                  </option>
                                  <option value="384">
                                    384-well plate (24x16)
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form controls */}
                        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <button
                            type="button"
                            onClick={handleClose}
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ModalComponent;
export type WellInfoType = {
  wellIndex: number;
  well: Well;
  onWellEdited: (value: Well) => void;
  onWellDeleted: (value: Well) => void;
};
