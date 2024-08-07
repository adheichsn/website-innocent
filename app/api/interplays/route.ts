import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const interplays = await prisma.interplayManager.findMany({
    include: {
      InterplayHandlers: true,
    },
  });

  const data = interplays.map((interplay) => ({
    zone_condition: interplay.zoneCondition,
    user: interplay.userId,
    interplay_handler: interplay.InterplayHandlers,
  }));

  return NextResponse.json(data, { status: 200 });
};
