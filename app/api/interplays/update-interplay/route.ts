import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const interplayManagerIdParam = url.searchParams.get("id");
    const interplayNameParam = url.searchParams.get("interplay");

    if (!interplayManagerIdParam) {
      return NextResponse.json("Interplay ID is Required", { status: 400 });
    }

    if (!interplayNameParam) {
      return NextResponse.json("Interplay Name is Required", { status: 400 });
    }
    
    const interplays = await prisma.interplayHandler.updateMany({
      where: { interplayManagerId: Number(interplayManagerIdParam) },
      data: {
        [interplayNameParam]: true,
      },
    });

    if (interplays.count === 0) {
      return NextResponse.json("No records updated", { status: 404 });
    }

    return NextResponse.json("Update data success!", { status: 200 });
  } catch (error) {
    return NextResponse.json(`Failed to update data: ${error}`, {
      status: 500,
    });
  }
};
