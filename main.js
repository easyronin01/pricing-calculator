/**
 * Main Entry Point for the Pricing Strategy Calculator
 * * This script serves as the primary controller for the application window.
 * It is configured to load the 'index.html' file from the local directory.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true,
    title: "Executive Decision Matrix"
  });

  /**
   * We use path.join and __dirname to ensure the application finds
   * the index.html file regardless of the drive letter or folder depth.
   */
  const filePath = path.join(__dirname, 'index.html');
  
  mainWindow.loadFile(filePath).catch(error => {
    console.error("The application failed to load the interface file:", error);
  });

  /**
   * Developer Tools
   * This window will open automatically to help diagnose any issues.
   * You can close it once the application is running perfectly.
   */
  mainWindow.webContents.openDevTools();
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