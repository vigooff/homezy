import { NextRequest, NextResponse } from "next/server";
import { FooterData } from "../../../types/footer";
import footerDataJson from "../../../data/footer.json";

const footerData = (footerDataJson as unknown) as FooterData;

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: footerData,
  });
}