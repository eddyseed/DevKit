import { serverEnv } from "@/lib/dotenv/env";
import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: serverEnv.groqApiKey,
});
