import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import moment from "moment"

import { getToken } from 'next-auth/jwt';
import { signIn, useSession } from 'next-auth/react';
import { error } from 'console';

import { SpinLoading } from "antd-mobile";
import { jwtDecode } from 'jwt-decode';

export const config = {
  matcher: ['/me', '/post/:path*', '/message', '/publish', '/member', '/explore', '/check_in'],
  authMatcher: ['/me', '/publish', '/message', '/check_in']
}

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl
  
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: 'pacal-session-token'
  })

  console.log('auth status', token)

  const isAuthenticated = !isNaN(+token?.user_id)

  if(config.authMatcher.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  const newHeaders = new Headers(req.headers)
  const response = NextResponse.next()
  if(isAuthenticated) {
    let checkin:any = req.cookies.get('checked_in')?.value

    console.log(checkin)

    const validDate = new Date(checkin);
    let currentTime = moment().format('YYYY-MM-DD')
    if(checkin === undefined || moment(validDate).format('YYYY-MM-DD') < currentTime) {
      console.log('redirect')
      const url = req.nextUrl.clone()
      url.pathname = `/check_in`
      
      newHeaders.set('Authorization', 'Bearer ' + token?.auth_token);
      const response = NextResponse.rewrite(url, {
        request: {
          // New request headers
          headers: newHeaders,
        },
      })
      return response
    }
    newHeaders.set('Authorization', 'Bearer ' + token?.auth_token);
  }

  return NextResponse.next({
    request: {
      // New request headers
      headers: newHeaders,
    },
  });
}