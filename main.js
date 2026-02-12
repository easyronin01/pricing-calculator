/**
 * Main Entry Point for the Pricing Strategy Calculator
 * This script manages the application window and loads the user interface blueprints.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    /**
     * We create the browser window with dimensions optimized for high resolution displays.
     * The icon requirement has been removed to ensure the build process completes 
     * without any industrial errors in your shipyard.
     */
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            // Secure configuration for modern desktop applications.
            nodeIntegration: false,
            contextIsolation: true
        },
        // This ensures the application looks like professional standalone software.
        autoHideMenuBar: true,
        title: "Executive Decision Matrix"
    });

    /**
     * The navigation coordinates.
     * We use path.join and __dirname to ensure the application finds the index.html file
     * regardless of whether it is running on your E drive or your work computer.
     */
    const filePath = path.join(__dirname, 'index.html');

    // We load the interface file and catch any errors if the file is missing from the directory.
    mainWindow.loadFile(filePath).catch(error => {
        console.error("The system failed to find the index.html file:", error);
    });

    /**
     * Note: The command to automatically open developer tools has been removed.
     * This provides a clean launch experience for you and your team in the Philippines.
     */
}

// This section starts the application once the environment is ready.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it is common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// We ensure the application shuts down completely when the window is closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});