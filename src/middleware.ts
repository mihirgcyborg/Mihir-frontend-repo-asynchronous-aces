import { NextRequest, NextResponse } from "next/server";




export function middleware(request: NextRequest){

    const token = request.cookies.get("userToken");
    // if(!token && !request.nextUrl.pathname.startsWith("/login")){  
    //   store.dispatch(logout()); 
    //     return NextResponse.redirect(new URL("/login",request.url));
    // }
    return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*","/inbox/:path*"], // add your protected routes here
};