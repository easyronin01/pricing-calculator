const { app, BrowserWindow } = require('electron');
const path = require('path');

/**
 * This script serves as the primary brain for your desktop application.
 * It instructs Windows to create a new window and load your calculator.
 */

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    // This sets the icon in the top-left corner and the taskbar
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Optional: Remove the default file menu for a cleaner look
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile('index.html');
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