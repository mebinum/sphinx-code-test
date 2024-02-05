"use client";
import React, { useState, useEffect } from "react";
import { Popover } from "@headlessui/react";
import { WellData, Well, handleWellType, WellConcentration } from "../models";
import { AddToWell, WellInfo } from "./wellInfo";
import clsx from "clsx";

type WellPlateType = {
  dimension: "384" | "96";
  onWellChanged: (data: WellData) => void;
  wells: WellData;
};

const WellPlate = ({ dimension, onWellChanged, wells }: WellPlateType) => {
  const rows = dimension === "384" ? 24 : 12;
  const cols = dimension === "384" ? 16 : 8;
  const style = dimension === "384" ? "grid-cols-24" : "grid-cols-12";
  const [wellData, setWellData] = useState<WellData>(wells);

  // Dummy data for well content
  useEffect(() => {
    onWellChanged(wellData);
  }, [wellData, onWellChanged]);

  const handleWellDataAdded = (data: Well) => {
    // do something with data
    setWellData((prev) => {
      const newWellData = { ...prev };
      newWellData[data.index] = data;
      return newWellData;
    });
  };

  const handleWellDeleted = (data: Well) => {
    // do something with data
    setWellData((prev) => {
      const newWellData = { ...prev };
      delete newWellData[data.index];
      return newWellData;
    });
  };
  const gridClass = clsx(
    `grid gap-1`,
    style,
    `p-2 mx-auto border-solid border-2 border-gray-30 bg-white rounded-l-large shadow-lg shadow-grey-500/40`,
  );
  const getConcentrationString = (val: WellConcentration) => {
    if (val === undefined) return "";
    val = val as WellConcentration;
    const { antibody, concentration } = val;
    return `\nA:${antibody}\nC:${concentration}`;
  };

  return (
    <>
      <div className={gridClass}>
        {Array.from({ length: rows * cols }, (_, index) => {
          const isEmpty =
            wellData === null ||
            wellData === undefined ||
            Object.keys(wellData).length === 0;

          const well = isEmpty
            ? { value: undefined, type: "" }
            : wellData[index];
          const wellColor = handleWellType(
            well?.type,
            "bg-red-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-gray-300",
          );
          const wellTitle = handleWellType(well?.type, "R", "A", "C");

          const wellHoverText = handleWellType(
            well?.type,
            well?.value,
            `A: ${well?.value}`,
            getConcentrationString(well?.value),
            "Empty",
          );

          return (
            <Popover
              key={index}
              className={clsx(
                `flex well h-8 w-8 rounded-full my-1 mx-auto hover:bg-indigo-500 hover:cursor-pointer relative`,
                wellColor,
              )}
              title={`Well ${index}: ${wellHoverText}`}
            >
              {/* Render well content */}
              <Popover.Button className="w-full h-full text-center text-sm font-bold justify-center text-stone-50 hover:text-grey-300">
                {wellTitle}
              </Popover.Button>

              <Popover.Panel className="rounded-lg outline outline-1 outline-indigo-500 border-gray-300 bg-white absolute z-10">
                <dl className="relative min-w-60 grid grid-cols-1 divide-y divide-gray-200 rounded-lg bg-white shadow md:divide-x md:divide-y-0">
                  {well?.value === undefined ? (
                    <AddToWell
                      wellIndex={index}
                      onWellDataAdded={handleWellDataAdded}
                    />
                  ) : (
                    <WellInfo
                      key={index}
                      wellIndex={index}
                      well={well}
                      onWellEdited={handleWellDataAdded}
                      onWellDeleted={handleWellDeleted}
                    />
                  )}
                </dl>
              </Popover.Panel>
            </Popover>
          );
        })}
      </div>
    </>
  );
};

export default WellPlate;
