import { SupabaseClient } from "@supabase/supabase-js";

export async function clearSettingsTable(supabase: SupabaseClient) {
    const { error } = await supabase
        .from("settings")
        .delete()
        .neq("id", process.env.NEXT_PUBLIC_SUPABASE_SETTINGS_UUID);

    if (error) throw error;
}