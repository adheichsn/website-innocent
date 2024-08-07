import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const interplay = await prisma.interplayManager.findFirst({
    where: { userId: params.id },
    include: {
      InterplayHandlers: true,
    },
  });

  const data = {
    zone_condition: interplay?.zoneCondition,
    interplay_id: interplay?.id,
    interplay: {
      BAGIDATA: interplay?.InterplayHandlers[0].BAGIDATA,
      BIGBOX: interplay?.InterplayHandlers[0].BIGBOX,
      BIGEYE: interplay?.InterplayHandlers[0].BIGEYE,
      DTRAL: interplay?.InterplayHandlers[0].DTRAL,
      HSI: interplay?.InterplayHandlers[0].HSI,
      INLET: interplay?.InterplayHandlers[0].INLET,
      IDEABOX: interplay?.InterplayHandlers[0].IDEABOX,
      INDIBIZ: interplay?.InterplayHandlers[0].INDIBIZ,
      MYDIGILEARN: interplay?.InterplayHandlers[0].MYDIGILEARN,
      OCA: interplay?.InterplayHandlers[0].OCA,
      PODCAST: interplay?.InterplayHandlers[0].PODCAST,
      SCN: interplay?.InterplayHandlers[0].SCN,
      ANTARESEAZY: interplay?.InterplayHandlers[0].ANTARESEAZY,
      SMARTHOME: interplay?.InterplayHandlers[0].SMARTHOME,
      SMARTVILLAGE: interplay?.InterplayHandlers[0].SMARTVILLAGE,
      SMARTEYE: interplay?.InterplayHandlers[0].SMARTEYE,
      SPRINTHINK: interplay?.InterplayHandlers[0].SPRINTHINK,
      YHC: interplay?.InterplayHandlers[0].YHC,
      TELKOMIOT: interplay?.InterplayHandlers[0].TELKOMIOT,
    },
  };

  return NextResponse.json(data, { status: 200 });
};
