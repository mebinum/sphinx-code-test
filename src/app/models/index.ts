import { inspect } from "util";
export type AssayPlate = {
  Id?: string;
  name: string;
  type: string;
  wells: WellData;
};

export type WellContent = "reagent" | "antibody" | "concentration";

const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");

export interface WellConcentration {
  antibody: string;
  concentration: number;
}

// WellConcentration.inspect = function (_depth: number, _opts: string[]) {
// }

export type WellType = {
  plateId: string;
  plateName: string;
  plateType: string;
};

export interface Well {
  index?: number;
  type: string | WellContent;
  value: string | WellConcentration;
}

export type WellData = Record<number, Well>;

export type WellInfoType = {
  wellIndex: number;
  well: Well;
  onWellEdited: (value: Well) => void;
  onWellDeleted: (value: Well) => void;
};

export const handleWellType = (
  type: WellContent,
  reagent: string,
  antibody: string,
  concentration: string,
  defaultV: string = "",
) => {
  switch (type) {
    case "reagent":
      return reagent;
    case "antibody":
      return antibody;
    case "concentration":
      return concentration;
    default:
      return defaultV;
  }
};
