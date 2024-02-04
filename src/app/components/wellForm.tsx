import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Well,
  WellConcentration,
  WellContent,
  handleWellType,
} from "../models";
import {
  generateAntibody,
  generateConcentration,
  generateReagent,
} from "../utils";
import clsx from "clsx";

interface WellFormProps {
  onSubmit: (data: Well) => void;
  onCancel: () => void;
  edit?: boolean;
  well?: Well;
}

interface WellFormState {
  [key: string | WellContent]: Well;
}

const reagentPattern = /^R\d{3,}$/;
const antibodyPattern = /^[A-Z]{20,40}$/;
const validateReagentOrAntibody = (value: string | WellConcentration) => {
  if (
    typeof value === "string" &&
    (reagentPattern.test(value) || antibodyPattern.test(value))
  ) {
    return true;
  }

  const concVal = value as WellConcentration;
  if (
    concVal &&
    antibodyPattern.test(concVal.antibody) &&
    concVal.concentration > 0
  )
    return true;

  return false;
};

export const WellForm = ({
  onSubmit,
  onCancel,
  edit = false,
  well,
}: WellFormProps) => {
  const [wellValue, setWellValue] = useState(
    edit ? well : { ...well, type: "reagent", value: generateReagent() },
  );

  const [previousWellValue, setPreviousWellValue] = useState<WellFormState>(
    edit ? { [well?.type]: well } : {},
  );

  const methods = useForm({
    defaultValues: wellValue,
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const type = wellValue?.type;
    const message = handleWellType(
      type as WellContent,
      "Invalid value Reagent should be in format R####",
      "Antibody should be in format ABCDEFGHIJKLMNOP",
      "Concentration should be have an Antibody in format AAAAAAA and a +ve float for concentration",
    );
    if (errors && errors.value && errors.value[type]) {
      const ref = errors.value[type].ref;
      ref.setCustomValidity(message);
    }
  }, [errors, wellValue]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as WellContent;
    // add form
    if (!edit) {
      const randomVal = handleWellType(
        type,
        generateReagent(),
        generateAntibody(),
        generateConcentration().toString(),
      );

      const newValue =
        type === "concentration"
          ? {
              antibody: generateAntibody(),
              concentration: generateConcentration(),
            }
          : randomVal;

      setWellValue({
        ...wellValue,
        type: type,
        value: newValue,
      });
      setValue("value", newValue);
      return;
    }
    // edit form
    const previousValue = previousWellValue[type];
    const newValue = previousValue === undefined ? "" : previousValue.value;
    previousWellValue[wellValue?.type] = wellValue;
    setPreviousWellValue(previousWellValue);
    setWellValue({
      type,
      value: newValue,
    });
    setValue("value", newValue);
  };

  const inputStyle = clsx(
    `block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`,
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="top-0 inset-x-0 p-2 duration-200 
ease-out transition transform origin-top-right"
    >
      <>
        <select
          required
          id="type"
          {...register("type")}
          onChange={handleTypeChange}
          className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option value="reagent">Reagent</option>
          <option value="antibody">Antibody</option>
          <option value="concentration">Concentration</option>
        </select>
        <input
          type="hidden"
          id="index"
          {...register("index")}
          value={wellValue?.index}
        />
        <div className="mt-2">
          {wellValue?.type === "concentration" && (
            <div className="grid grid-cols-2 gap-1">
              <input
                type="text"
                placeholder="Antibody "
                required
                id="value.antibody"
                {...register("value.antibody", {
                  pattern: antibodyPattern,
                })}
                className={inputStyle}
              />
              <input
                type="text"
                placeholder="Concentration"
                required
                id="value.concentration"
                {...register("value.concentration", {
                  min: 0,
                })}
                className={inputStyle}
              />
            </div>
          )}
          {wellValue?.type !== "concentration" && (
            <input
              type="text"
              placeholder="Well Content"
              required
              id="value"
              {...register("value", {
                validate: validateReagentOrAntibody,
              })}
              className={inputStyle}
            />
          )}
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={onCancel}
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
      </>
    </form>
  );
};
