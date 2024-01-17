import type { ContextBridge } from "@common/Core";
import type { Theme } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { getTheme } from "../Theme";

export const useTheme = (contextBridge: ContextBridge) => {
    const [theme, setTheme] = useState<Theme>(getTheme(contextBridge));

    useEffect(() => {
        contextBridge.ipcRenderer.on("nativeThemeChanged", () => setTheme(getTheme(contextBridge)));
    }, []);

    return { theme, setTheme };
};