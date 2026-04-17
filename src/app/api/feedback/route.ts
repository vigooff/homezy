import { NextResponse } from "next/server";
import feedbacksDataJson from "../../../data/feedback.json";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: feedbacksDataJson.feedbacks.length,
    data: feedbacksDataJson.feedbacks,
  });
}