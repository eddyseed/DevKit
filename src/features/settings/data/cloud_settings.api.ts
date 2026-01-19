import { supabase } from "@/lib/supabase/client";
import {
  GeneralSchema,
  EditorSchema,
  AppearanceSchema,
  BehaviourSchema,
  FileStorageSchema,
  PrivacySchema,
  GeneralSettings,
  EditorSettings,
  AppearanceSettings,
  BehaviourSettings,
  FileStorageSettings,
  PrivacySettings,
} from "../config/notepad/settings.schema";

export async function fetchSettings() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.log("[settings] fetchSettings → start");

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", process.env.NEXT_PUBLIC_SUPABASE_SETTINGS_USER_UUID)
    .single();

  if (error) {
    console.error("[settings] fetchSettings → supabase error", {
      code: error.code,
      message: error.message,
      details: error.details,
    });
    throw error;
  }

  console.log("[settings] fetchSettings → raw data", data);

  try {
    const parsed = {
      general: GeneralSchema.parse(data),
      editor: EditorSchema.parse(data),
      appearance: AppearanceSchema.parse(data),
      behaviour: BehaviourSchema.parse(data),
      fileStorage: FileStorageSchema.parse(data),
      privacy: PrivacySchema.parse(data),
    };

    console.log("[settings] fetchSettings → parsed success", parsed);

    return parsed;
  } catch (zodError) {
    console.error("[settings] fetchSettings → zod validation failed", zodError);
    throw zodError;
  }
}
export async function syncSettings(settings: {
  general: GeneralSettings;
  editor: EditorSettings;
  appearance: AppearanceSettings;
  behaviour: BehaviourSettings;
  fileStorage: FileStorageSettings;
  privacy: PrivacySettings;
}) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  console.log("[settings] syncSettings → start");

  try {
    // optional: validate before uploading (recommended)
    const validated = {
      ...GeneralSchema.parse(settings.general),
      ...EditorSchema.parse(settings.editor),
      ...AppearanceSchema.parse(settings.appearance),
      ...BehaviourSchema.parse(settings.behaviour),
      ...FileStorageSchema.parse(settings.fileStorage),
      ...PrivacySchema.parse(settings.privacy),
    };

    const { error } = await supabase
      .from("settings")
      .update(validated)
      .eq("user_id", process.env.NEXT_PUBLIC_SUPABASE_SETTINGS_USER_UUID);

    if (error) {
      console.error("[settings] syncSettings → supabase error", {
        code: error.code,
        message: error.message,
        details: error.details,
      });
      throw error;
    }

    console.log("[settings] syncSettings → success");
  } catch (err) {
    console.error("[settings] syncSettings → failed", err);
    throw err;
  }
}
