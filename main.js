const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Operations Calculator",
        backgroundColor: '#0f172a', // Matches slate-900
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            spellcheck: false
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
    win.setMenuBarVisibility(false);

    // --- UPDATED: Download Handler ---
    // This now triggers the "Save As" dialog instead of auto-saving.
    win.webContents.session.on('will-download', (event, item, webContents) => {
        
        // We define the dialog options to make it look professional
        item.setSaveDialogOptions({
            title: 'Save Operations Report',
            defaultPath: item.getFilename(),
            filters: [
                { name: 'Excel Files', extensions: ['xlsx'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        });

        // CRITICAL CHANGE: We removed 'item.setSavePath(...)'. 
        // By NOT forcing a path, Electron will automatically open the "Save As" dialog.
        
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed');
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused');
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`);
                }
            }
        });
        
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully');
            } else {
                console.log(`Download failed: ${state}`);
            }
        });
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});