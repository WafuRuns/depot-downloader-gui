import { Progress } from 'electron-dl';

export function getApp() {
    return (window as Window & typeof globalThis & AppData).app;
}

export interface AppData {
    app: {
        close: () => void;
        maximize: () => void;
        minimize: () => void;
        openSteamDB: () => void;
        downloadDotNet: () => void;
        downloadFile: (url: string) => void;
        downloadDepot: (
            appId: string,
            depotId: string,
            manifestId: string,
            saveTo: string,
            username: string,
            password: string,
        ) => void;
        onProgress: (sender: (progress: Progress) => void) => void;
        onDownloaded: (sender: () => void) => void;
    };
}
