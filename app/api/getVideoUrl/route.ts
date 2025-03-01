import { NextResponse } from "next/server";
import { getVideoUrl } from "../isl_r2_util";

export const runtime = 'edge';

export async function POST(request: Request) {
  interface RequestBody {
    category: string;
    expression: string;
    filename: string;
  }
  try {
    const body = await request.json();
    const { category, expression, filename } = body as RequestBody;
    if (!category || !expression || !filename) {
      return NextResponse.json({ error: "Missing category, expression, or filename" }, { status: 400 });
    }
    const url = await getVideoUrl({ category, expression, filename });    
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching video URL" }, { status: 500 });
  }
}
