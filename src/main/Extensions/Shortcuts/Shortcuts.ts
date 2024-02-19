import type { AssetPathResolver } from "@Core/AssetPathResolver";
import type { Extension } from "@Core/Extension";
import type { UrlImageGenerator } from "@Core/ImageGenerator";
import type { SettingsManager } from "@Core/SettingsManager";
import type { SearchResultItem } from "@common/Core";
import { getExtensionSettingKey, type Translations } from "@common/Core/Extension";
import type { Image } from "@common/Core/Image";
import type { Shortcut, ShortcutType } from "@common/Extensions/Shortcuts";

export class Shortcuts implements Extension {
    private static readonly translationNamespace = "extension[Shortcuts]";

    public readonly id = "Shortcuts";
    public readonly name = "Shortcuts";

    public readonly nameTranslation = {
        key: "extensionName",
        namespace: Shortcuts.translationNamespace,
    };

    public readonly author = {
        name: "Oliver Schwendener",
        githubUserName: "oliverschwendener",
    };

    private defaultSettings: { shortcuts: Shortcut[] } = {
        shortcuts: [],
    };

    public constructor(
        private readonly settingsManager: SettingsManager,
        private readonly assetPathResolver: AssetPathResolver,
        private readonly urlImageGenerator: UrlImageGenerator,
    ) {}

    public async getSearchResultItems(): Promise<SearchResultItem[]> {
        const shortcuts = this.settingsManager.getValue<Shortcut[]>(
            getExtensionSettingKey(this.id, "shortcuts"),
            this.defaultSettings.shortcuts,
        );

        return shortcuts.map(
            ({ name, id, type, argument, hideWindowAfterInvokation }): SearchResultItem => ({
                name: name,
                description: "Shortcut",
                descriptionTranslation: {
                    key: "shortcut",
                    namespace: Shortcuts.translationNamespace,
                },
                id,
                image: this.getSearchResultItemImage(type, argument),
                defaultAction: {
                    argument: JSON.stringify({ type, argument }),
                    description: "Invoke shortcut",
                    descriptionTranslation: {
                        key: "invokeShortcut",
                        namespace: Shortcuts.translationNamespace,
                    },
                    handlerId: "Shortcut",
                    hideWindowAfterInvocation: hideWindowAfterInvokation,
                    fluentIcon: "ArrowSquareUpRightRegular",
                },
            }),
        );
    }

    public isSupported(): boolean {
        return true;
    }

    public getSettingDefaultValue<T>(key: string): T {
        return this.defaultSettings[key];
    }

    public getImage(): Image {
        return {
            url: `file://${this.assetPathResolver.getExtensionAssetPath(this.id, "bolt.square.svg")}`,
        };
    }

    public getSettingKeysTriggeringRescan(): string[] {
        return [getExtensionSettingKey(this.id, "shortcuts")];
    }

    public getTranslations(): Translations {
        return {
            "en-US": {
                extensionName: "Shortcuts",
                shortcut: "Shortcut",
                shortcuts: "Shortcuts",
                invokeShortcut: "Invoke shortcut",
                type: "Type",
                typeFile: "File",
                typeUrl: "URL",
                filePath: "File Path",
                fileOrFolderDoesNotExist: "File/folder does not exist",
                name: "Name",
                invalidName: "Invalid name",
                hideWindowAfterInvokation: "Hide window after invokation",
                createShortcut: "Create Shortcut",
                editShortcut: "Edit Shortcut",
                save: "Save",
                cancel: "Cancel",
                edit: "Edit",
                remove: "Remove",
            },
            "de-CH": {
                extensionName: "Verknüpfungen",
                shortcut: "Verknüpfung",
                shortcuts: "Verknüpfungen",
                invokeShortcut: "Verknüpfung aufrufen",
                type: "Typ",
                typeFile: "Datei",
                typeUrl: "URL",
                filePath: "Dateipfad",
                fileOrFolderDoesNotExist: "Datei/Ordner existiert nicht",
                name: "Name",
                invalidName: "Ungültiger Name",
                hideWindowAfterInvokation: "Fester verstecken nach Ausführung",
                createShortcut: "Verknüpfung erstellen",
                editShortcut: "Verknüpfung bearbeiten",
                save: "Speichern",
                cancel: "Abbrechen",
                edit: "Bearbeiten",
                remove: "Entfernen",
            },
        };
    }

    private getSearchResultItemImage(shortcutType: ShortcutType, shortcutArgument: string): Image {
        if (shortcutType === "Url") {
            return this.urlImageGenerator.getImage(shortcutArgument);
        }

        return this.getImage();
    }
}