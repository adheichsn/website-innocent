import { PrismaClient, type User, Role } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

export type CreateUserData = Omit<
  User,
  "id" | "passwordHash" | "createdAt" | "updatedAt"
> & {
  role: Role;
  password: string;
};

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user && (await compare(password, user.passwordHash))) {
    return user;
  }
}

export async function createUser({
  email,
  name,
  role,
  password,
}: CreateUserData) {
  const passwordHash = await hash(password, 10);
  return await prisma.user.create({
    data: {
      email,
      name,
      role,
      passwordHash,
      InterplayManagers: {
        create: {
          InterplayHandlers: {
            create: {}
          },
        },
      },
    },
  });
}
