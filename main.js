const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window with specific dimensions.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    // This ensures the application looks like a native program.
    autoHideMenuBar: true,
    title: "Pricing Strategy Calculator"
  });

  // Load the portable calculator file from the same directory.
  mainWindow.loadFile('portable_calculator.html');
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it is common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});