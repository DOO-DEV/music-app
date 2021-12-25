import { NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (signedinPages.find((page) => page === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
