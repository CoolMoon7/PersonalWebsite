import { NextResponse, type NextRequest } from "next/server";

/** The résumé prints colebonawitz.com/FDE; route any casing to the real /fde page. */
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/fde";
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ["/FDE", "/Fde", "/FDe", "/fDE", "/fdE", "/FdE", "/fDe"] };
