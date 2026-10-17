import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ segments: string[] }> };
const cookieName = "bonjour_admin_session";
const apiOrigin = new URL(process.env.SITE_API_URL ?? "http://127.0.0.1:8000/api/v1/site").origin;

function endpoint(segments: string[], method: string): string | null {
  const path = segments.join("/");
  if (path === "session") return ({ GET: "me", POST: "login", DELETE: "logout" } as Record<string, string>)[method] ?? null;
  if (path === "forgot-password" && method === "POST") return "forgot-password";
  if (path === "reset-password" && method === "POST") return "reset-password";
  if (path === "inquiries" && method === "GET") return path;
  if (/^inquiries\/\d+$/.test(path) && ["GET", "PATCH"].includes(method)) return path;
  if (/^inquiries\/\d+\/attachment$/.test(path) && method === "GET") return path;
  if (path === "team" && ["GET", "POST"].includes(method)) return path;
  if (/^team\/\d+$/.test(path) && method === "PATCH") return path;
  if (/^team\/\d+\/invite$/.test(path) && method === "POST") return path;
  if (path === "profile" && method === "POST") return path;
  if (path === "products" && ["GET", "POST"].includes(method)) return path;
  if (/^products\/\d+$/.test(path) && ["GET", "PATCH"].includes(method)) return path;
  if (/^products\/\d+\/image$/.test(path) && method === "POST") return path;
  if (path === "blog" && ["GET", "POST"].includes(method)) return path;
  if (/^blog\/\d+$/.test(path) && ["GET", "PATCH"].includes(method)) return path;
  if (/^blog\/\d+\/cover$/.test(path) && method === "POST") return path;
  if (path === "site" && ["GET", "PATCH"].includes(method)) return path;
  if (path === "site/hero-image" && method === "POST") return path;
  return null;
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "");
  try { return Boolean(host && new URL(origin).host === host && new URL(origin).protocol === `${protocol}:`); }
  catch { return false; }
}

async function handle(request: NextRequest, context: Context): Promise<NextResponse> {
  const { segments } = await context.params;
  const path = endpoint(segments, request.method);
  if (!path) return NextResponse.json({ message: "Not found." }, { status: 404 });
  if (request.method !== "GET" && !sameOrigin(request)) return NextResponse.json({ message: "Origin not allowed." }, { status: 403 });

  const session = (await cookies()).get(cookieName)?.value;
  const isPublic = ["login", "forgot-password", "reset-password"].includes(path);
  if (!isPublic && !session) return NextResponse.json({ message: "Please sign in." }, { status: 401 });

  const headers = new Headers({ Accept: "application/json" });
  if (session && !isPublic) headers.set("Authorization", `Bearer ${session}`);
  const contentType = request.headers.get("content-type") ?? "";
  let body: FormData | string | undefined;
  if (request.method !== "GET" && request.method !== "DELETE") {
    if (contentType.includes("multipart/form-data")) body = await request.formData();
    else {
      headers.set("Content-Type", "application/json");
      body = await request.text();
    }
  }

  try {
    const query = ["inquiries", "products", "blog"].includes(path) ? new URL(request.url).search : "";
    const upstream = await fetch(`${apiOrigin}/api/v1/admin/${path}${query}`, { method: request.method === "DELETE" ? "POST" : request.method, headers, body, cache: "no-store" });
    if (path.endsWith("/attachment") && upstream.ok) {
      const response = new NextResponse(upstream.body, { status: upstream.status });
      response.headers.set("Content-Type", upstream.headers.get("Content-Type") ?? "application/octet-stream");
      response.headers.set("Content-Disposition", upstream.headers.get("Content-Disposition") ?? "attachment");
      return response;
    }
    const data = await upstream.json();
    if (path === "login" && upstream.ok && typeof data.token === "string") {
      const response = NextResponse.json({ user: data.user });
      response.cookies.set(cookieName, data.token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 12 });
      return response;
    }
    const response = NextResponse.json(data, { status: upstream.status });
    if (path === "logout" || upstream.status === 401) response.cookies.delete(cookieName);
    return response;
  } catch {
    return NextResponse.json({ message: "Admin service is temporarily unavailable." }, { status: 503 });
  }
}

export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const DELETE = handle;
