import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export const config = {
  matcher: ['/api/protected/:path*']
};

export default withMiddlewareAuthRequired();