
import React, { useState, useEffect } from'react';
import { useForm } from "react-hook-form";
import { Well, handleWellType } from '../models';
import { generateAntibody, generateConcentration, generateReagent } from '../utils';

interface WellFormProps {
  onSubmit: (data: Well) => void;
  onCancel: () => void;
  edit?: boolean;
  well?: Well;
}

export const WellForm = ({ onSubmit, onCancel, edit = false, well}: WellFormProps) => {
const [wellValue, setWellValue] = useState(edit ? well : {...well,value: generateReagent()});

  const methods = useForm({ 
    defaultValues: wellValue
  });

  const { handleSubmit, register, setValue } = methods;

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // add form 
    if(!edit) {
      const type = e.target.value;
    const newValue = handleWellType(type, generateReagent(),generateAntibody(),
             generateConcentration());
    setWellValue({
        ...wellValue,
        value: newValue
    });
    setValue('value', newValue);
    }
    
  }

  return (
   <form onSubmit={handleSubmit(onSubmit)} className="top-0 inset-x-0 p-2 duration-200 
ease-out transition transform origin-top-right">
            <>
                <select
                  required
                  id="type"
                  {...register("type")}
                  onChange={handleTypeChange}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="reagent">Reagent</option>
                    <option value="antibody">Antibody</option>
                  </select>
                 <input type='hidden' id="index" {...register("index")} value={wellValue?.index} />
              <div className="mt-2">
                <input
                    type="text"
                    placeholder="Well Content"
                    required
                    id="value"
                    {...register("value")}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
              </div>
            
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" 
            onClick={onCancel}
            className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
            </>
        </form>
  )
}