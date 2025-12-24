import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ message: "Logged out successfully" });

    res.cookies.set("devkit_auth", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
    });

    return res;
}

// Optional: prevent GET
export async function GET() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
