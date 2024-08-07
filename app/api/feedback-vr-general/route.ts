import { FeedbackForVR, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();
  const feedback = await prisma.feedbackVRGeneral.create({
    data: {
      userId: body.userId,
      ratingQ1: Number(body.ratingQ1),
      ratingQ2: Number(body.ratingQ2),
      ratingQ3: Number(body.ratingQ3),
      ratingQ4: Number(body.ratingQ4),
      ratingQ5: Number(body.ratingQ5),
      ratingQ6: Number(body.ratingQ6),
      ratingQ7: Number(body.ratingQ7),
      comment: body.comment,
    },
  });
  return NextResponse.json(
    { response: "Terima Kasih! Feedback yang Anda berikan!" },
    {
      status: 201,
    }
  );
};

export const GET = async () => {
  // Retrieve all feedback entries and include user names
  const feedbacks = await prisma.feedbackVRGeneral.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // Get total count of feedback entries
  const totalCount = await prisma.feedbackVRGeneral.count();

  const poorRating = 0;
  const fairRating = 1;
  const averageRating = 2;
  const goodRating = 3;
  const excellenceRating = 4;

  // Function to get the count of ratings
  const getRatingCount = async (rating: number, question: string) => {
    return prisma.feedbackVRGeneral.count({
      where: {
        [question]: rating,
      },
    });
  };

  const questionRatings = {
    question1: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ1"),
      ratingFair: await getRatingCount(fairRating, "ratingQ1"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ1"),
      ratingGood: await getRatingCount(goodRating, "ratingQ1"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ1"),
    },
    question2: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ2"),
      ratingFair: await getRatingCount(fairRating, "ratingQ2"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ2"),
      ratingGood: await getRatingCount(goodRating, "ratingQ2"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ2"),
    },
    question3: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ3"),
      ratingFair: await getRatingCount(fairRating, "ratingQ3"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ3"),
      ratingGood: await getRatingCount(goodRating, "ratingQ3"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ3"),
    },
    question4: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ4"),
      ratingFair: await getRatingCount(fairRating, "ratingQ4"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ4"),
      ratingGood: await getRatingCount(goodRating, "ratingQ4"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ4"),
    },
    question5: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ5"),
      ratingFair: await getRatingCount(fairRating, "ratingQ5"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ5"),
      ratingGood: await getRatingCount(goodRating, "ratingQ5"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ5"),
    },
    question6: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ6"),
      ratingFair: await getRatingCount(fairRating, "ratingQ6"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ6"),
      ratingGood: await getRatingCount(goodRating, "ratingQ6"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ6"),
    },
    question7: {
      ratingPoor: await getRatingCount(poorRating, "ratingQ7"),
      ratingFair: await getRatingCount(fairRating, "ratingQ7"),
      ratingAverage: await getRatingCount(averageRating, "ratingQ7"),
      ratingGood: await getRatingCount(goodRating, "ratingQ7"),
      ratingExcellence: await getRatingCount(excellenceRating, "ratingQ7"),
    },
  };

  // Calculate percentages
  const calculatePercentages = (
    poorCount: number,
    fairCount: number,
    averageCount: number,
    goodCount: number,
    excellenceCount: number,
    totalCount: number
  ) => {
    return {
      percentPoor:
        totalCount > 0
          ? Number(((poorCount / totalCount) * 100).toFixed(2))
          : 0,
      percentFair:
        totalCount > 0
          ? Number(((fairCount / totalCount) * 100).toFixed(2))
          : 0,
      percentAverage:
        totalCount > 0
          ? Number(((averageCount / totalCount) * 100).toFixed(2))
          : 0,
      percentGood:
        totalCount > 0
          ? Number(((goodCount / totalCount) * 100).toFixed(2))
          : 0,
      percentExcellence:
        totalCount > 0
          ? Number(((excellenceCount / totalCount) * 100).toFixed(2))
          : 0,
    };
  };

  const questionResponse = {
    question1: {
      ...questionRatings.question1,
      ...calculatePercentages(
        questionRatings.question1.ratingPoor,
        questionRatings.question1.ratingFair,
        questionRatings.question1.ratingAverage,
        questionRatings.question1.ratingGood,
        questionRatings.question1.ratingExcellence,
        totalCount
      ),
    },
    question2: {
      ...questionRatings.question2,
      ...calculatePercentages(
        questionRatings.question2.ratingPoor,
        questionRatings.question2.ratingFair,
        questionRatings.question2.ratingAverage,
        questionRatings.question2.ratingGood,
        questionRatings.question2.ratingExcellence,
        totalCount
      ),
    },
    question3: {
      ...questionRatings.question3,
      ...calculatePercentages(
        questionRatings.question3.ratingPoor,
        questionRatings.question3.ratingFair,
        questionRatings.question3.ratingAverage,
        questionRatings.question3.ratingGood,
        questionRatings.question3.ratingExcellence,
        totalCount
      ),
    },
    question4: {
      ...questionRatings.question4,
      ...calculatePercentages(
        questionRatings.question4.ratingPoor,
        questionRatings.question4.ratingFair,
        questionRatings.question4.ratingAverage,
        questionRatings.question4.ratingGood,
        questionRatings.question4.ratingExcellence,
        totalCount
      ),
    },
    question5: {
      ...questionRatings.question5,
      ...calculatePercentages(
        questionRatings.question5.ratingPoor,
        questionRatings.question5.ratingFair,
        questionRatings.question5.ratingAverage,
        questionRatings.question5.ratingGood,
        questionRatings.question5.ratingExcellence,
        totalCount
      ),
    },
    question6: {
      ...questionRatings.question6,
      ...calculatePercentages(
        questionRatings.question6.ratingPoor,
        questionRatings.question6.ratingFair,
        questionRatings.question6.ratingAverage,
        questionRatings.question6.ratingGood,
        questionRatings.question6.ratingExcellence,
        totalCount
      ),
    },
    question7: {
      ...questionRatings.question7,
      ...calculatePercentages(
        questionRatings.question7.ratingPoor,
        questionRatings.question7.ratingFair,
        questionRatings.question7.ratingAverage,
        questionRatings.question7.ratingGood,
        questionRatings.question7.ratingExcellence,
        totalCount
      ),
    },
  };

  // Combine all data into a single response object
  const feedback = {
    feedbacks,
    totalCount,
    questionResponse,
  };

  return NextResponse.json(feedback, { status: 200 });
};
