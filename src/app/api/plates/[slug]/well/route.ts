import { type NextRequest, NextResponse } from "next/server";
import { AssayPlate as Plate } from "@/app/models";
import { db, findPlateById } from "@/app/database";
/**
 *
 * Updates the well information of the plate with the given plateId
 * 
 * URL: /api/plates/[slug]/well
 * VERB: PATCH
 * @export
 * @param {NextRequest} req
 * @param {{ params: { slug: string } }} { params }
 * @returns
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: { slug: string } },
) {
    try {
        const plateId = params.slug;
        const data = await req.json();
        const oldPlate: Plate | undefined = findPlateById(plateId);

        if (oldPlate === undefined || oldPlate === null) {
            return NextResponse.json(
                { message: `Plate id ${plateId} does not exist"` },
                { status: 404 },
            );
        }
        db.update(({ plates }) =>
            plates.map((assayPlate) => {
                if (assayPlate.Id === plateId) {
                    return {
                        ...oldPlate,
                        well: data,
                    };
                }
                return assayPlate;
            }),
        );
        return NextResponse.json({
            message: `Well information added successfully to Plate ${plateId}`,
        });
    }
}


/**
 * Gets the well information of the plate with the given plateId
 *
 * @export
 * @param {NextRequest} req
 * @param {{ params: { slug: string } }} { params }
 * @returns
 */
export async function GET(req: NextRequest, { params }: { params: { slug: string } },) {
    const plateId = params.slug;
    const plate: Plate | undefined = findPlateById(plateId);

    if (plate === undefined || plate === null) {
        return NextResponse.json(
            { message: `Plate id ${plateId} does not exist"` },
            { status: 404 },
        );
    }
    return NextResponse.json({
        message: "Well information retrieved successfully",
        plateId,
        well: plate.wells,
    });
}