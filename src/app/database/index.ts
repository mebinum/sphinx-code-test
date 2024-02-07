import { JSONFileSync } from "lowdb/node";
import { LowSync, MemorySync, SyncAdapter } from "lowdb";

import { AssayPlate as Plate } from "@/app/models";

type Data = {
  plates: Plate[];
};
// Create a new instance of the lowdb database using a JSON file as the data source
const defaultData: Data = { plates: [] };
const adapter: SyncAdapter<Data> =
  process.env.NODE_ENV === "test"
    ? new MemorySync<Data>()
    : new JSONFileSync<Data>("db.json");
export const db = new LowSync<Data>(adapter, defaultData);

export const findPlateById = (plateId: string): Plate | undefined =>
  db.data.plates.find((plate) => plate.Id === plateId);
