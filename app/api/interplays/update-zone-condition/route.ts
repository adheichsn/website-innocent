import { InterplayManager, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("id");

    if (!userIdParam) {
      return NextResponse.json("User ID is required", { status: 400 });
    }

    const body: Partial<InterplayManager> = await request.json();

    if (!body.zoneCondition) {
      return NextResponse.json("Zone condition is required", { status: 400 });
    }

    const interplays = await prisma.interplayManager.updateMany({
      where: { userId: userIdParam },
      data: {
        zoneCondition: body.zoneCondition,
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
