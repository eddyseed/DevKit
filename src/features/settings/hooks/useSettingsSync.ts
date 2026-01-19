import { useEffect, useRef } from "react";
import { useSettingsStore } from "../store/settings.store";

export function useSettingsSync() {
  const hydrateFromCloud = useSettingsStore(s => s.hydrateFromCloud);
  const syncSettingsToCloud = useSettingsStore(s => s.syncSettingsToCloud);
  const syncEnabled = useSettingsStore(s => s.privacy.syncSettings);

  const general = useSettingsStore(s => s.general);
  const editor = useSettingsStore(s => s.editor);
  const appearance = useSettingsStore(s => s.appearance);
  const behaviour = useSettingsStore(s => s.behaviour);
  const fileStorage = useSettingsStore(s => s.fileStorage);
  const privacy = useSettingsStore(s => s.privacy);

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (syncEnabled && !hydratedRef.current) {
      hydrateFromCloud();
      hydratedRef.current = true;
    }
  }, [syncEnabled, hydrateFromCloud]);
  useEffect(() => {
    if (!syncEnabled || !hydratedRef.current) return;

    const timeout = setTimeout(() => {
      syncSettingsToCloud();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [
    syncEnabled,
    syncSettingsToCloud,

    general,
    editor,
    appearance,
    behaviour,
    fileStorage,
    privacy,
  ]);
}
