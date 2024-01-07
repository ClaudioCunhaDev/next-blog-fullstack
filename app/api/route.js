import { NextResponse, NextRequest } from "next/server";

export async function GET(request, response) {
  return NextResponse.json({ message: "Hello from NEXT API" });
}
