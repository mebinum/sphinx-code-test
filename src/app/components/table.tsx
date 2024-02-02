import React, { useState } from 'react'
import ModalComponent from './modal';
import { AssayPlate, WellType } from '../models';
import { PlusIcon } from '@heroicons/react/20/solid'
import short from "short-uuid";

type TableType = {
    title: string;
    description: string;
};


function EmptyWells({ onClickAdd }: { onClickAdd: () => void}) {
    return (
        <div className=" w-full p-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="mx-auto h-12 w-12 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No plates </h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new plate.</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onClickAdd}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Plate
        </button>
      </div>
    </div>
    )
} 


function Table({ description, title }: TableType) {
  const [isOpen, setIsOpen] = useState(false);
  const [assayPlates, setAssayPlates] = useState<AssayPlate[]>([])
 const translator = short();
  function createPlate({plateId, plateName, plateType}: WellType) {
    setAssayPlates([
        ...assayPlates,
        {Id: plateId, name: plateName, type: plateType}
    ])
    closeModal();
  }

  function openModal() {
      setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  
  return (
    <>
    <div className="mb-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            { description }
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={openModal}
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Id
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {assayPlates && assayPlates.length === 0 ? 
                  <tr> 
                    <td colSpan={4}>
                    <EmptyWells onClickAdd={openModal} /> 
                    </td>
                  </tr>
                  : 
                  assayPlates.map((plate) => (
                    <tr key={plate.Id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {plate.Id ? translator.fromUUID(plate.Id) : ""}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{plate.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{plate.type}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {plate.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalComponent isModalOpen={isOpen} onSubmit={createPlate} handleClose={closeModal} />
    </>
  )
}

export default Table
