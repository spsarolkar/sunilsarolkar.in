import { NextResponse } from "next/server";
import { getTestData } from "../isl_r2_util";
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const url = await getTestData();
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Error in API route getTestData:", error.message);
    return NextResponse.json({ error: error.message || "Error fetching test data" }, { status: 500 });
  }
}