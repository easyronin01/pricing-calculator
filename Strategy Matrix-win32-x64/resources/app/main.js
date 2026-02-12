const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // We create the browser window with specialized settings for our strategy matrix.
    // We have set the width to twelve hundred and the height to eight hundred pixels.
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Pricing Strategy Matrix",
        backgroundColor: '#f8fafc', // This matches the slate background to prevent white flashes.
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            spellcheck: false
        }
    });

    // We point specifically to index.html as you confirmed this is the filename on your laptop.
    // Using path.join ensures that the file is located correctly within your folder structure.
    win.loadFile(path.join(__dirname, 'index.html'));

    // We disable the menu bar to keep the interface focused and immersive.
    win.setMenuBarVisibility(false);
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it is common to re-create a window in the app when the dock icon is clicked.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS where applications stay active.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});