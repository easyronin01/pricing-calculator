/**
 * Main Entry Point for the Pricing Strategy Matrix
 * This script manages the application window and loads the user interface.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    /**
     * Create the browser window with dimensions optimized for high resolution displays.
     * We have ensured that the menu bar is hidden to maintain a professional look.
     */
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            // Security settings to protect your operational data.
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true,
        title: "Pricing Strategy Matrix"
    });

    /**
     * Set the path to the interface file. 
     * We use path.join to ensure compatibility with your current directory 
     * on the C drive of the RTO Laptop 1.
     */
    const filePath = path.join(__dirname, 'index.html');

    mainWindow.loadFile(filePath).catch(error => {
        console.error("The system failed to find index.html in the current folder:", error);
    });
}

/**
 * Standard Electron lifecycle management.
 * The application initiates once the shipyard is ready.
 */
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // Re-create the window if the dock icon is clicked (macOS behavior).
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

/**
 * Ensures the application shuts down completely when the window is closed,
 * keeping your laptop's memory clear of any background tasks.
 */
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});