import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await compare(body.password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const expirationTime = new Date(Date.now() + JWT_DURATION);
    const access_token = await new SignJWT({
      userId: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(expirationTime)
      .sign(JWT_SECRET);

    const userId = user.id;
    const userName = user.name;
    const userEmail = user.email;
    const response = {
      userId,
      userName,
      userEmail,
      access_token,
    };

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
