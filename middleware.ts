import { type NextRequest } from "next/server";
import { updateSession } from "./src/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Skip static files and image optimization
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.png|art/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"
  ]
};
