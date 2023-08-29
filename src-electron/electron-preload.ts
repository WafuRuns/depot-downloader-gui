/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */
import { contextBridge, ipcRenderer } from 'electron';
import { Progress } from 'electron-dl';

contextBridge.exposeInMainWorld('app', {
    close: () => ipcRenderer.send('closeApp'),
    maximize: () => ipcRenderer.send('maximizeApp'),
    minimize: () => ipcRenderer.send('minimizeApp'),
    openSteamDB: () => ipcRenderer.send('openSteamDB'),
    downloadDotNet: () => ipcRenderer.send('downloadDotNet'),
    downloadFile: (url: string) =>
        ipcRenderer.send('downloadFile', { url: url }),
    downloadDepot: (
        appId: string,
        depotId: string,
        manifestId: string,
        saveTo: string,
        username: string,
        password: string,
    ) =>
        ipcRenderer.send('downloadDepot', {
            appId: appId,
            depotId: depotId,
            manifestId: manifestId,
            saveTo: saveTo,
            username: username,
            password: password,
        }),
    onProgress: (sender: (progress: Progress) => void) => {
        ipcRenderer.on('downloadProgress', (_, progress) => sender(progress));
    },
    onDownloaded: (sender: () => void) => {
        ipcRenderer.on('downloadedFile', () => sender());
    },
});
