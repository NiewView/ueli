import { Divider } from "@fluentui/react-components";
import { Route, Routes, useNavigate } from "react-router";
import { Navigation } from "./Navigation";
import { settingsPages } from "./Pages";
import { SettingsHeader } from "./SettingsHeader";

export const Settings = () => {
    const navigate = useNavigate();
    const closeSettings = () => navigate({ pathname: "/" });
    const navigateTo = (pathname: string) => navigate({ pathname });

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flexShrink: 0 }}>
                <SettingsHeader onCloseSettingsClicked={closeSettings} />
                <Divider appearance="subtle" />
            </div>

            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    boxSizing: "border-box",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", width: "200px", padding: 10, boxSizing: "border-box" }}>
                        <Navigation settingsPages={settingsPages} onNavigate={navigateTo} />
                    </div>
                    <Divider appearance="subtle" vertical />
                </div>
                <div
                    style={{
                        height: "100%",
                        flexGrow: 1,
                        overflowY: "scroll",
                        padding: 20,
                        boxSizing: "border-box",
                    }}
                >
                    <Routes>
                        {settingsPages.map(({ element, relativePath }) => (
                            <Route
                                key={`settings-page-content-${relativePath}`}
                                path={relativePath}
                                element={element}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </div>
    );
};