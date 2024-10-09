import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // Ermöglicht das Laden von lokalem JavaScript
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'), // Optional, falls du ein Preload-Skript hast
        },
    });

    // Lade die index.html der React-App
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
}

// Diese Methode wird aufgerufen, wenn Electron gestartet wird
app.whenReady().then(createWindow);

// Beenden, wenn alle Fenster geschlossen sind (außer auf macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Wenn die App wieder aktiv ist, erstelle ein neues Fenster
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
