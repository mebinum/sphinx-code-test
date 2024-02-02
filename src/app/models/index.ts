
export type AssayPlate = {
    Id?: string;
    name: string;
    type: string;
}

export type WellContent = "reagent" | "antibody" | "concentration";

export type WellType = {
    plateId: string;
    plateName: string;
    plateType: string;
}

export interface Well {
    index?: number;
    type?: string | WellContent;
    value?: string;
}

export type WellData = Record<number, Well>;

export const handleWellType = (type: WellContent, reagent: string, antibody: string, concentration: string, defaultV: string = "") => {

    switch (type) {
        case 'reagent':
            return reagent;
        case 'antibody':
            return antibody;
        case 'concentration':
            return concentration;
        default:
            return defaultV;
    }

}