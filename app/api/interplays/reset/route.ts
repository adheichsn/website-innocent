import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("id");

    if (!userIdParam) {
      return NextResponse.json("User ID is required", { status: 400 });
    }

    await prisma.interplayManager.updateMany({
      where: { userId: userIdParam },
      data: { zoneCondition: "HIPSTER" },
    });

    const interplayManager = await prisma.interplayManager.findFirst({
      where: { userId: userIdParam },
    });

    if (!interplayManager) {
      return NextResponse.json("Interplay Manager not found", { status: 404 });
    }

    await prisma.interplayHandler.updateMany({
      where: { interplayManagerId: interplayManager.id },
      data: {
        BAGIDATA: false,
        BIGBOX: false,
        BIGEYE: false,
        DTRAL: false,
        HSI: false,
        INLET: false,
        IDEABOX: false,
        INDIBIZ: false,
        MYDIGILEARN: false,
        OCA: false,
        PODCAST: false,
        SCN: false,
        ANTARESEAZY: false,
        SMARTHOME: false,
        SMARTVILLAGE: false,
        SMARTEYE: false,
        SPRINTHINK: false,
        YHC: false,
        TELKOMIOT: false,
      },
    });

    return NextResponse.json("Reset data success!", { status: 200 });
  } catch (error) {
    return NextResponse.json(`Failed to update data: ${error}`, {
      status: 500,
    });
  }
};
