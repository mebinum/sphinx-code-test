import { NextRequest } from "next/server";
import { POST, GET } from "../src/app/api/plates/route";
import { db } from "../src/app/database";

//jest.createMockFromModule("../src/app/database");

// , () => ({
//   update: jest.fn(),
//   data: {
//     plates: [],
//   },
// }));

describe("plate POST endpoint :/api/plates", () => {
  it("should return error response if dimension or name is not provided", async () => {
    const req = {
      method: "POST",
      json: async () => ({}),
    } as NextRequest;
    const response = await POST(req);
    expect(response.status).toBe(400);
    expect(response.json()).toEqual({
      error: "Plate requires a dimension and name",
    });
  });

  it("should add new plate to the database", async () => {
    const req = {
      method: "POST",
      json: async () => ({ dimension: 96, name: "Plate 1" }),
    } as NextRequest;
    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(response.json()).toHaveProperty(
      "message",
      "Plate created successfully",
    );
    expect(response.json()).toHaveProperty("plate");
    expect(db.update).toHaveBeenCalled();
  });
});

describe("plates GET endpoint  :/api/plates", () => {
  it("should retrieve plates from the database", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.json()).toHaveProperty(
      "message",
      "Plates retrieved successfully",
    );
    expect(response.json()).toHaveProperty("plates");
  });
});
