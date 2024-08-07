import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "Email already exists",
      }, { status: 400 });
    }

    const passwordHashed = await hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash: passwordHashed,
        role: "USER",
        InterplayManagers: {
          create: {
            InterplayHandlers: {
              create: {}
            },
          },
        },
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: user
    }, { status: 201 });
  } catch (error) {
    let errorMessage = "An error occurred while creating the user";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({
      message: errorMessage
    }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: [
        {
          role: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    const totalUser = await prisma.user.count();

    return NextResponse.json({
      message: "Users retrieved successfully",
      users: users,
      totalUser: totalUser
    });
  } catch (error) {
    let errorMessage = "An error occurred while retrieving the users";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({
      message: errorMessage
    }, { status: 500 });
  }
};
