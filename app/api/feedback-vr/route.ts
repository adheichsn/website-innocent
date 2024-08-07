import { FeedbackForVR, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();
  const feedback = await prisma.feedbackVR.create({
    data: {
      userId: body.userId,
      for: body.for,
      ratingQ1: Number(body.ratingQ1),
      ratingQ2: Number(body.ratingQ2),
      ratingQ3: Number(body.ratingQ3),
      ratingQ4: Number(body.ratingQ4),
      ratingQ5: Number(body.ratingQ5),
    },
  });
  return NextResponse.json(
    { response: "Terima Kasih! Feedback yang Anda berikan!" },
    {
      status: 201,
    }
  );
};

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const forParam = url.searchParams.get("for");

  if (!forParam) {
    return NextResponse.json(
      { error: 'Missing "for" query parameter' },
      { status: 400 }
    );
  }

  // Retrieve all feedback entries and include user names
  const feedbacks = await prisma.feedbackVR.findMany({
    where: {
      for: forParam as FeedbackForVR,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // Get total count of feedback entries
  const totalCount = await prisma.feedbackVR.count({
    where: {
      for: forParam as FeedbackForVR,
    },
  });

  const goodRating = 2;
  const badRating = 1;

  // Function to get the count of ratings
  const getRatingCount = async (rating: number, question: string) => {
    return prisma.feedbackVR.count({
      where: {
        for: forParam as FeedbackForVR,
        [question]: rating,
      },
    });
  };

  const questionRatings = {
    question1: {
      ratingGood: await getRatingCount(goodRating, "ratingQ1"),
      ratingBad: await getRatingCount(badRating, "ratingQ1"),
    },
    question2: {
      ratingGood: await getRatingCount(goodRating, "ratingQ2"),
      ratingBad: await getRatingCount(badRating, "ratingQ2"),
    },
    question3: {
      ratingGood: await getRatingCount(goodRating, "ratingQ3"),
      ratingBad: await getRatingCount(badRating, "ratingQ3"),
    },
    question4: {
      ratingGood: await getRatingCount(goodRating, "ratingQ4"),
      ratingBad: await getRatingCount(badRating, "ratingQ4"),
    },
    question5: {
      ratingGood: await getRatingCount(goodRating, "ratingQ5"),
      ratingBad: await getRatingCount(badRating, "ratingQ5"),
    },
  };

  // Calculate percentages
  const calculatePercentages = (
    goodCount: number,
    badCount: number,
    totalCount: number
  ) => {
    return {
      percentGood: totalCount > 0 ? (goodCount / totalCount) * 100 : 0,
      percentBad: totalCount > 0 ? (badCount / totalCount) * 100 : 0,
    };
  };

  const questionResponse = {
    question1: {
      ...questionRatings.question1,
      ...calculatePercentages(
        questionRatings.question1.ratingGood,
        questionRatings.question1.ratingBad,
        totalCount
      ),
    },
    question2: {
      ...questionRatings.question2,
      ...calculatePercentages(
        questionRatings.question2.ratingGood,
        questionRatings.question2.ratingBad,
        totalCount
      ),
    },
    question3: {
      ...questionRatings.question3,
      ...calculatePercentages(
        questionRatings.question3.ratingGood,
        questionRatings.question3.ratingBad,
        totalCount
      ),
    },
    question4: {
      ...questionRatings.question4,
      ...calculatePercentages(
        questionRatings.question4.ratingGood,
        questionRatings.question4.ratingBad,
        totalCount
      ),
    },
    question5: {
      ...questionRatings.question5,
      ...calculatePercentages(
        questionRatings.question5.ratingGood,
        questionRatings.question5.ratingBad,
        totalCount
      ),
    },
  };

  // Combine all data into a single response object
  const feedback = {
    feedbacks,
    totalCount,
    questionResponse
  };

  return NextResponse.json(feedback, { status: 200 });
};
