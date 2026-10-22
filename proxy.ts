import { NextResponse, type NextRequest } from "next/server";

/**
 * The résumé prints colebonawitz.com/FDE; route any casing to the real /fde page.
 * Matchers can be case-insensitive, so only redirect when the casing actually differs.
 */
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/fde") return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/fde";
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ["/FDE", "/Fde", "/FDe", "/fDE", "/fdE", "/FdE", "/fDe"] };
