import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();
  const feedback = await prisma.feedback.create({
    data: {
      userId: body.userId,
      rating: Number(body.rating),
      description: body.description,
    },
  });
  return NextResponse.json(feedback, { status: 201 });
};

export const GET = async () => {
  // Retrieve all feedback entries and include user names
  const feedbacks = await prisma.feedback.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // Aggregate feedback counts by rating
  const feedbackCounts = await prisma.feedback.groupBy({
    by: ["rating"],
    _count: {
      rating: true,
    },
  });

  // Map the counts by rating to make them more accessible
  const ratingsCount = {
    totalFeedbackPoor: 0,
    totalFeedbackFair: 0,
    totalFeedbackAverage: 0,
    totalFeedbackGood: 0,
    totalFeedbackExcellent: 0,
  };

  feedbackCounts.forEach((count) => {
    switch (count.rating) {
      case 0:
        ratingsCount.totalFeedbackPoor = count._count.rating;
        break;
      case 1:
        ratingsCount.totalFeedbackFair = count._count.rating;
        break;
      case 2:
        ratingsCount.totalFeedbackAverage = count._count.rating;
        break;
      case 3:
        ratingsCount.totalFeedbackGood = count._count.rating;
        break;
      case 4:
        ratingsCount.totalFeedbackExcellent = count._count.rating;
        break;
    }
  });

  const totalFeedback = feedbacks.length;

  // Combine all data into a single response object
  const feedback = {
    totalFeedback,
    ...ratingsCount,
    feedbacks,
  };

  return NextResponse.json(feedback, { status: 200 });
};
