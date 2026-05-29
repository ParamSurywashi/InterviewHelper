export { default } from 'next-auth/middleware'
export const config = {
  matcher: ['/dashboard/:path*','/applications/:path*','/companies/:path*','/planner/:path*','/profile/:path*','/calendar/:path*']
}