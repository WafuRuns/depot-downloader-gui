import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron';
import path from 'path';
import os from 'os';
import { download } from 'electron-dl';
import decompress from 'decompress';
import { spawn } from 'child_process';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
    if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
        require('fs').unlinkSync(
            path.join(app.getPath('userData'), 'DevTools Extensions'),
        );
    }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
        width: 1280,
        height: 720,
        useContentSize: false,
        webPreferences: {
            contextIsolation: true,
            // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
            preload: path.resolve(
                __dirname,
                process.env.QUASAR_ELECTRON_PRELOAD,
            ),
        },
        frame: false,
    });

    mainWindow.removeMenu();

    mainWindow.loadURL(process.env.APP_URL);

    if (process.env.DEBUGGING) {
        // if on DEV or Production with debug enabled
        mainWindow.webContents.openDevTools();
    } else {
        // we're on production; no access to devtools pls
        mainWindow.webContents.on('devtools-opened', () => {
            mainWindow?.webContents.closeDevTools();
        });
    }

    mainWindow.on('closed', () => {
        mainWindow = undefined;
    });

    ipcMain.on('closeApp', () => {
        mainWindow?.close();
    });

    ipcMain.on('minimizeApp', () => {
        mainWindow?.minimize();
    });

    ipcMain.on('maximizeApp', () => {
        if (mainWindow?.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow?.maximize();
        }
    });

    ipcMain.on('openSteamDB', () => {
        shell.openExternal('https://steamdb.info');
    });

    ipcMain.on('downloadDotNet', () => {
        shell.openExternal(
            'https://dotnet.microsoft.com/en-us/download/dotnet/6.0',
        );
    });

    ipcMain.on('downloadFile', async (_, data: { url: string }) => {
        if (mainWindow) {
            await download(mainWindow, data.url, {
                directory: app.getPath('userData'),
                onProgress: (progress) => {
                    mainWindow?.webContents.send('downloadProgress', progress);
                },
                onCompleted: (file) => {
                    decompress(file.path, app.getPath('userData')).then(() => {
                        mainWindow?.webContents.send('downloadedFile');
                    });
                },
            }).catch((error) => {
                console.error(error);
            });
        }
    });

    ipcMain.on(
        'downloadDepot',
        (
            _,
            data: {
                appId: string;
                depotId: string;
                manifestId: string;
                saveTo: string;
                username: string;
                password: string;
            },
        ) => {
            spawn(
                `"${app.getPath('userData')}/DepotDownloader.exe"`,
                [
                    `-app ${data.appId}`,
                    `-depot ${data.depotId}`,
                    `-manifest ${data.manifestId}`,
                    `-dir ${data.saveTo}`,
                    `-username ${data.username}`,
                    `-password ${data.password}`,
                ],
                {
                    shell: true,
                    detached: true,
                },
            );
        },
    );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === undefined) {
        createWindow();
    }
});
