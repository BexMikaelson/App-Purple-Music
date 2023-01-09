import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
    const url = req.nextUrl.clone();
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith)('/_next/') || 
        pathname.includes('.')  

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
      }

    if (!token && pathname !== "/Login") {
        url.pathname = "/Login";
        return NextResponse.redirect(url);
    }
}
 export const config = { matcher: ["/"] }


