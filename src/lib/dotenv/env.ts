function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

/**
 * Client-safe env variables
 * (Only NEXT_PUBLIC_* should be exposed)
 */
export const clientEnv = {
    firebase: {
        apiKey: required("NEXT_PUBLIC_FIREBASE_API_KEY"),
        authDomain: required("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
        projectId: required("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
        storageBucket: required("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
        messagingSenderId: required(
            "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
        ),
        appId: required("NEXT_PUBLIC_FIREBASE_APP_ID"),
        measurementId: required(
            "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
        ),
    },

    supabase: {
        url: required("NEXT_PUBLIC_SUPABASE_URL"),
        anonKey: required("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    },
};

/**
 * Server-only env variables
 * ❗ Never import this into client components
 */
export const serverEnv = {
    totpSecret: required("TOTP_SECRET"),
    groqApiKey: required("GROQ_API_KEY"),
};
/**
 * NODE_ENV handling
 */
export const NODE_ENV = (process.env.NODE_ENV || "development") as
    | "development"
    | "production"
    | "test";

export const isDev = NODE_ENV === "development";
export const isProd = NODE_ENV === "production";
export const isTest = NODE_ENV === "test";