
import React, {useState} from 'react';
import DnaIcon  from "../../../public/dna.svg"
import AntibodyIcon  from "../../../public/bacteria.svg"
import BioLabIcon  from "../../../public/bio_lab.svg"
import AddDataIcon  from "../../../public/add_data.svg"
import EditIcon  from "../../../public/edit.svg"
import DeleteIcon  from "../../../public/delete.svg"

import { Well } from '../models';

import clsx from 'clsx';
import { WellForm } from './wellForm';

interface IconMap {
  [key: string]: {
    icon: React.ComponentType<any>;
  };
}

type WellInfoType = {
  wellIndex: number,
  well: Well,
  onWellEdited: (value: Well) => void,
  onWellDeleted: (value: Well) => void
}

export const WellInfo = ({wellIndex, well, onWellEdited, onWellDeleted }: WellInfoType) => {
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    
  const iconType: IconMap = {
  'reagent': {
    icon: DnaIcon
  },
  'antibody': {
    icon: AntibodyIcon
  },
  'concentration': {
    icon: BioLabIcon
  }
}
    const onSubmit = (value: Well) => {
        console.log(value);
        onWellEdited(value);
        setShowForm(false);
    };

    const editWell = () => {
        setShowForm(true);
        setIsEdit(true);
    };

    const deleteWell = () => {
        setShowForm(true);
        setIsDelete(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setIsEdit(false);
        setIsDelete(false);
    };

   const handleDelete = () => {
        setShowForm(false);
        setIsEdit(false);
        setIsDelete(false);
        onWellDeleted(well);
    };
  const icon = iconType[well.type].icon;
  const valueStyle = clsx("flex items-baseline font-semibold text-indigo-600", well.type === 'antibody'? 'text-xs' : 'text-xl');
  return (
    <>  
        { !showForm && <div key={wellIndex} className="px-4 py-5">
            <dt className="flex items-center text-base font-normal text-gray-900 text-center">
                <div className=" rounded-md bg-indigo-500 p-2 mr-2">
                    {icon({className:"h-6 w-6 text-white", "aria-hidden":true})}
                </div>
                <h2 className="text-xl">Well #{wellIndex}</h2>
                <div className="absolute top-3 right-3 items-center">
                    <button onClick={editWell}>
                        <EditIcon className="h-4 w-4 text-indigo float-right" aria-hidden="true" />
                    </button>
                    <button onClick={deleteWell}>
                        <DeleteIcon className="h-4 w-4 text-indigo float-right" aria-hidden="true" />
                    </button>
                </div>
            </dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className={valueStyle}>
                {well.value}
              </div>
            </dd>
          </div>}
          {showForm && isEdit &&
            <WellForm onSubmit={onSubmit} edit onCancel={handleCancel} well={well} />
          }
          {showForm && isDelete && 
          <div className="px-4 py-5">
          <dt className="flex items-center text-base font-normal text-gray-900 text-center">
            <div className="mt-2 flex flex-shrink-0 text-center">
                <h3 className="text-base leading-6 font-medium text-gray-900">
                    Really Delete Well #{well.index}?
                </h3>
            </div>
         </dt>
          <dd className="mt-2">
            <p className="text-sm text-gray-500 text-center">
                    This action cannot be undone.
                </p>
          </dd>
            <dd className='px-4 mt-3 mx-auto'>
                <button type="button" 
                onClick={handleCancel}
                className="mr-4 text-sm font-semibold leading-6 rounded-md text-gray-900 border border-gray-400 px-3 py-2 hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-500">
                Cancel
                </button>
                <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                Delete
                </button>
            </dd>

          
          </div>
          }
          </>
);
}

export const AddToWell = ({wellIndex, onWellDataAdded}: {wellIndex: number, onWellDataAdded: (data: Well) => void}) => {
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (value: Well) => {
    onWellDataAdded(value);
    setShowForm(false);
  }

  const handleCancel = () => {
    setShowForm(false);
  }

  return(
  <>
  {/* hide button when form is shown */}
  {!showForm && <button
      type="button"
      onClick={() => setShowForm(true)}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <AddDataIcon className="mx-auto h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-semibold text-gray-900">Add data to well #{wellIndex}</span>
    </button>
    }
    {/* show form after button is click */}
      {showForm &&
        <WellForm onSubmit={onSubmit} onCancel={handleCancel} well={{index: wellIndex}}  />
        }
    </>)
};