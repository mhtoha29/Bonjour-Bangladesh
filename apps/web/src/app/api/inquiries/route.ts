import { NextRequest, NextResponse } from "next/server";

const apiOrigin = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site").origin;

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") ?? 0) > 11 * 1024 * 1024) {
    return NextResponse.json({ message: "The attachment is too large." }, { status: 413 });
  }

  try {
    const response = await fetch(`${apiOrigin}/api/v1/inquiries`, {
      method: "POST",
      body: await request.formData(),
      cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ message: "Inquiry service is temporarily unavailable. Please try again or email us." }, { status: 503 });
  }
}
