import { NextResponse } from 'next/server'

export default function middleware(req) {
  const signedinPages = ['/', '/playlist', '/library']
  if (signedinPages.find(page => page === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN
    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
