import { type NextRequest, NextResponse } from "next/server";
import { AssayPlate as Plate } from "@/app/models";
import { db, findPlateById } from "@/app/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  return WithTryCatch(async () => {
    const plateId = params.slug; // 'a', 'b', or 'c'

    const plate: Plate | undefined = findPlateById(plateId);

    if (plate === undefined || plate === null) {
      return NextResponse.json(
        { message: `Plate id ${plateId} does not exist` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Well information retrieved successfully",
      well: plate.wells,
    });
  });
}

/**
 * updates the plate with the given plateId with the date provided
 *
 * @export
 * @param {NextRequest} req
 * @param {{ params: { slug: string } }} { params }
 * @returns
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return WithTryCatch(async () => {
    const plateId = params.slug;
    const data = await req.json();
    const oldPlate: Plate | undefined = findPlateById(plateId);

    if (oldPlate === undefined || oldPlate === null) {
      return NextResponse.json(
        { message: `Plate id ${plateId} does not exist"` },
        { status: 404 },
      );
    }

    const updatedPlate = {
      ...oldPlate,
      ...data,
    };

    const { plates } = db.data;

    const updatedPlates = plates.map((assayPlate) => {
      if (assayPlate.Id === plateId) {
        return updatedPlate;
      }
      return assayPlate;
    });
    db.data = { plates: updatedPlates };
    db.write();
    console.log("plates after update", db.data.plates);
    return NextResponse.json({
      message: `Well information added successfully to Plate ${plateId}`,
      plate: updatedPlate,
    });
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  return WithTryCatch(async () => {
    const plateId = params.slug;

    const oldPlate: Plate | undefined = findPlateById(plateId);

    if (oldPlate === undefined || oldPlate === null) {
      return NextResponse.json(
        { message: `Plate id ${plateId} does not exist"` },
        { status: 404 },
      );
    }

    const { plates } = db.data;

    const updatedPlates = plates.filter(
      (assayPlate) => assayPlate.Id !== plateId,
    );
    db.data = { plates: updatedPlates };
    db.write();

    return NextResponse.json({
      message: `Plate ${plateId} deleted successfully`,
    });
  });
}

function WithTryCatch(
  handleRequest: () => Promise<NextResponse<{ message: string }>>,
) {
  try {
    return handleRequest();
  } catch (error: Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
