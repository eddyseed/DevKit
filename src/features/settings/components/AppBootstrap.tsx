"use client";
import { useEffect } from "react";
import { useSettingsStore } from "../store/settings.store";

const AppBootstrap = () => {
    const syncEnabled = useSettingsStore(s => s.privacy.syncSettings);
    const hydrateFromCloud = useSettingsStore(s => s.hydrateFromCloud);
    useEffect(() => {
        if (!syncEnabled) return;
        
        hydrateFromCloud();
    }, [syncEnabled, hydrateFromCloud]);

    return null;
};

export default AppBootstrap;
