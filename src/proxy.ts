import { NextRequest, NextResponse } from 'next/server';

// Define public paths that don't require authentication
const PUBLIC_PATHS = ['/auth/login', '/api/totp', '/favicon.ico'];

// Helper function to check if the requested path is public
function isPublicPath(pathname: string) {
    if (PUBLIC_PATHS.includes(pathname)) return true;
    if (pathname.startsWith('/auth/login')) return true;
    return false;
}

// Middleware function to handle authentication and proxying requests
export function proxy(req: NextRequest) {

    // Allow requests for static assets and Next.js internals to pass through
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/assets') ||
        pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|ttf|woff2?)$/)
    ) {
        return NextResponse.next();
    }

    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    const authCookie = req.cookies.get('devkit_auth')?.value;

    if (!authCookie) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/auth/login/';
        loginUrl.searchParams.set('from', pathname || '/');

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/image).*)'],
};
