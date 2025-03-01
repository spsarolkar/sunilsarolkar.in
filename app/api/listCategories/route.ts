import { NextResponse } from "next/server";
import { listCategories } from "../isl_r2_util";
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const data = await listCategories();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
}