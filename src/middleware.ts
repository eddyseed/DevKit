import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/auth/login', '/api/totp', '/favicon.ico'];

function isPublicPath(pathname: string) {
    if (PUBLIC_PATHS.includes(pathname)) return true;
    // Allow anything under /auth and /api/totp (e.g. nested routes, if any)
    if (pathname.startsWith('/auth/login')) return true;
    if (pathname.startsWith('/api/totp')) return true;
    return false;
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 1) Allow Next internals and static assets
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/assets') ||
        pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|ttf|woff2?)$/)
    ) {
        return NextResponse.next();
    }

    // 2) Allow public paths (auth screen, TOTP API, favicon)
    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    // 3) Check devkit_auth cookie
    const authCookie = req.cookies.get('devkit_auth')?.value;

    if (!authCookie) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/auth/login/';
        loginUrl.searchParams.set('from', pathname || '/');

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Apply to almost all paths; we filter more precisely inside middleware
export const config = {
    matcher: ['/((?!_next/image).*)'],
};
