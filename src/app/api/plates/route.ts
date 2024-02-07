import { AssayPlate as Plate, WellData } from "@/app/models";
import { db } from "@/app/database";
import { type NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

/**
 * Add a new plate to the database.
 *
 * @export
 * @param {NextRequest} req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const { dimension, name }: Partial<Plate> = await req.json();

    if (dimension === undefined || name === undefined) {
      return NextResponse.json(
        { error: "Plate requires a dimension and name" },
        { status: 400 },
      );
    }

    const plate: Plate = {
      Id: uuidv4(),
      dimension,
      name,
      wells: {},
    };

    db.update(({ plates }) => plates.push(plate));

    return NextResponse.json({ message: "Plate created successfully", plate });
  } catch (error: Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { plates } = db.data;
    return NextResponse.json({
      message: "Plates retrieved successfully",
      plates,
    });
  } catch (error: Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
