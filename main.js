/**
 * Main Entry Point for the Pricing Strategy Calculator
 * This script manages the application window and loads the user interface.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window with dimensions optimized for high-resolution displays.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        // Ensures a professional look without a top menu bar.
        autoHideMenuBar: true,
        title: "Executive Decision Matrix"
    });

    /**
     * Set the path to the interface file. 
     * We use path.join to ensure compatibility with your E drive setup.
     */
    const filePath = path.join(__dirname, 'index.html');

    mainWindow.loadFile(filePath).catch(error => {
        console.error("The system failed to find index.html in the current folder:", error);
    });

    // The openDevTools command has been removed to ensure a clean launch.
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});