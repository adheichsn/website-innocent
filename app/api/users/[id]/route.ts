import { NextResponse } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: User = await request.json();
  const passwordHashed = await hash(body.passwordHash, 10);
  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      email: body.email,
      passwordHash: passwordHashed,
    },
  });
  return NextResponse.json(user, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Validate the ID first if necessary, e.g., check format
    if (!params.id) {
      return new NextResponse(
        JSON.stringify({ error: "User ID is required" }),
        {
          status: 400, // Bad Request
        }
      );
    }

    const user = await prisma.user.delete({
      where: {
        id: params.id, // Directly using params.id since it's already a string
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404, // Not Found
      });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200, // OK
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    // Handling potential cases where user might not exist or DB errors
    return new NextResponse(
      JSON.stringify({
        error:
          "Failed to delete user: " + error,
      }),
      {
        status: 500, // Internal Server Error
      }
    );
  }
};
