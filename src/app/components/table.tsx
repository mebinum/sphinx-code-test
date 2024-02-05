import React, { useState, Fragment } from "react";
import CreatePlate from "./createPlate";
import { AssayPlate, WellType } from "../models";
import { PlusIcon } from "@heroicons/react/20/solid";
import DeleteIcon from "../../../public/delete.svg";
import short from "short-uuid";
import { EmptyWells } from "./EmptyWells";
import EditPlate from "./editPlate";
import { Dialog, Transition } from "@headlessui/react";

type TableType = {
  title: string;
  description: string;
};

function Table({ description, title }: TableType) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentPlate, setCurrentPlate] = useState<AssayPlate>();

  const [assayPlates, setAssayPlates] = useState<AssayPlate[]>([]);
  const translator = short();

  function createPlate({ plateId, plateName, plateType }: WellType) {
    const newPlate = {
      Id: plateId,
      name: plateName,
      type: plateType,
      wells: {},
    };
    setAssayPlates([...assayPlates, newPlate]);
    console.log("send add to server with newplate", newPlate);
    closeCreateModal();
  }

  function updatePlate(plate: AssayPlate) {
    console.log("send update to server", plate);
    setAssayPlates(
      assayPlates.map((assayPlate) => {
        if (assayPlate.Id === plate.Id) {
          return plate;
        }
        return assayPlate;
      }),
    );
  }

  const handleEditPlate = (plate: AssayPlate) => {
    setCurrentPlate(plate);
    setIsEditOpen(true);
  };

  const handleCancelDelete = () => {
    setCurrentPlate(null);
    setIsDeleteOpen(false);
  };

  const onClickDeletePlate = (plate: AssayPlate) => {
    setCurrentPlate(plate);
    setIsDeleteOpen(true);
  };

  const handleDeletePlate = () => {
    console.log("send delete request to server", currentPlate);
    setAssayPlates((plates) =>
      plates.filter((toDelete) => toDelete.Id !== currentPlate?.Id),
    );
    setIsDeleteOpen(false);
  };

  const handleCreatePlate = () => {
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCreatePlate}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Plate
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {assayPlates && assayPlates.length === 0 ? (
                      <tr>
                        <td colSpan={4}>
                          <EmptyWells onClickAdd={handleCreatePlate} />
                        </td>
                      </tr>
                    ) : (
                      assayPlates.map((plate) => (
                        <tr key={plate.Id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {plate.Id ? translator.fromUUID(plate.Id) : ""}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                            {plate.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                            {plate.type}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={handleEditPlate.bind(this, plate)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                              <span className="sr-only">Edit {plate.name}</span>
                            </button>
                            <button
                              onClick={onClickDeletePlate.bind(this, plate)}
                              className="ml-2 mt-2 leading-6"
                            >
                              <DeleteIcon
                                className="h-4 w-4 text-indigo float-right"
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreatePlate
        isModalOpen={isCreateOpen}
        onSubmit={createPlate}
        handleClose={closeCreateModal}
      />

      {isEditOpen && (
        <EditPlate
          isModalOpen={isEditOpen}
          plate={currentPlate}
          onPlateChanged={updatePlate}
          handleClose={closeEditModal}
        />
      )}

      {isDeleteOpen && (
        <Transition.Root show={isDeleteOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={handleCancelDelete}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Really Delete Plate #{currentPlate?.name}?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      onClick={handleCancelDelete}
                      className="mr-4 text-sm font-semibold leading-6 rounded-md text-gray-900 border border-gray-400 px-3 py-2 hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePlate}
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}

export default Table;
