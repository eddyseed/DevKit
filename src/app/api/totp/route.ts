import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import { totpRequestSchema, TotpRequest } from '@/lib/validation/totp';

authenticator.options = {
    window: 2,
};

export async function POST(req: NextRequest) {
    let jsonBody: unknown;

    try {
        jsonBody = await req.json();
    } catch {
        return NextResponse.json(
            { ok: false, error: 'Invalid JSON body' },
            { status: 400 },
        );
    }

    const parsed = totpRequestSchema.safeParse(jsonBody);

    if (!parsed.success) {
        return NextResponse.json(
            {
                ok: false,
                error: 'Invalid request body',
                issues: parsed.error.issues,
            },
            { status: 400 },
        );
    }

    const { code } = parsed.data as TotpRequest;

    const secret = process.env.TOTP_SECRET;
    if (!secret) {
        return NextResponse.json(
            { ok: false, error: 'Server misconfigured: TOTP_SECRET missing' },
            { status: 500 },
        );
    }

    // Debug logs (remove in production)
    console.log('[TOTP] Input code:', code);

    const isValid = authenticator.check(code, secret);

    console.log('[TOTP] isValid:', isValid);

    if (!isValid) {
        return NextResponse.json(
            { ok: false, error: 'Invalid code' },
            { status: 401 },
        );
    }

    // On success: create a response and attach cookie
    const res = NextResponse.json({ ok: true });

    res.cookies.set('devkit_auth', '1', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 12, // 12 hours
        path: '/',
    });

    return res;
}
