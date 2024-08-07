import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();
  const logs = await prisma.logVrtour.create({
    data: {
      userId: body.userId,
    },
  });
  return NextResponse.json(logs, { status: 201 });
};

export const GET = async () => {
  // Calculate the date one month ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Fetch logVrtour records from the last month
  const logVrtoursLastMount = await prisma.logVrtour.findMany({
    where: {
      createdAt: {
        gte: oneMonthAgo,
      },
    },
    select: {
      userId: true,
      createdAt: true,
    },
  });

  // Aggregate accesses per day
  const accessesPerDay: { [date: string]: number } = {};

  logVrtoursLastMount.forEach((log) => {
    const date = log.createdAt.toISOString().split("T")[0];
    if (!accessesPerDay[date]) {
      accessesPerDay[date] = 0;
    }
    accessesPerDay[date] += 1;
  });

  // Prepare the data for the response
  const dailyAccess = Object.keys(accessesPerDay).map((date) => ({
    date,
    count: accessesPerDay[date],
  }));

  // Aggregate data to get the count of accesses per user
  const userAccess = await prisma.logVrtour.groupBy({
    by: ["userId"],
    _count: {
      userId: true,
    },
  });

  // Fetch all logVrtour records to get createdAt data
  const logVrtours = await prisma.logVrtour.findMany({
    select: {
      userId: true,
      createdAt: true,
    },
  });

  // Create a map to store the earliest createdAt for each user
  const userCreatedAtMap: { [userId: string]: Date } = {};

  logVrtours.forEach((log) => {
    if (
      !userCreatedAtMap[log.userId] ||
      userCreatedAtMap[log.userId] > log.createdAt
    ) {
      userCreatedAtMap[log.userId] = log.createdAt;
    }
  });

  // Include user details separately if needed
  const usersWithAccessCounts = await Promise.all(
    userAccess.map(async (item) => {
      const user = await prisma.user.findUnique({
        where: { id: item.userId },
        select: {
          name: true,
        },
      });
      return {
        user,
        accessCount: item._count.userId,
        createdAt: userCreatedAtMap[item.userId],
      };
    })
  );

  // Sort users by access count in descending order
  const sortedUsersWithAccessCounts = usersWithAccessCounts.sort(
    (a, b) => b.accessCount - a.accessCount
  );

  // Calculate the total number of accesses
  const totalAccesses = await prisma.logVrtour.count();

  const userAccesses = sortedUsersWithAccessCounts.map((userCount) => {
    return {
      userName: userCount.user?.name,
      count: userCount.accessCount,
      createdAt: userCount.createdAt,
    };
  });

  const response = {
    userAccesses,
    total: totalAccesses,
    dailyAccess,
  };

  return NextResponse.json(response, { status: 201 });
};
