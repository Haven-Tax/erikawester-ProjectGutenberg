import { NextResponse } from "next/server";
import { testDatabaseConnection } from "@/app/services/bookService";

export async function GET() {
  const result = await testDatabaseConnection();
  return NextResponse.json(result);
}
