const electronInstaller = require('electron-winstaller');
const path = require('path');

// This script acts as the primary architect that packages your 
// application into a professional Windows Setup wizard.
async function createExecutable() {
    console.log("Beginning the construction of the Windows Installer.");
    
    try {
        await electronInstaller.createWindowsInstaller({
            // This points to the folder created by your build command.
            appDirectory: path.join(__dirname, 'dist/Strategy Matrix-win32-x64'),
            // This is the destination where the Setup executable will be placed.
            outputDirectory: path.join(__dirname, 'installers'),
            authors: 'Strategy Matrix Ops',
            exe: 'Strategy Matrix.exe',
            setupExe: 'StrategyMatrixSetup.exe',
            description: 'A high performance pricing strategy calculator.',
            title: 'Pricing Strategy Matrix',
            // We set this to true to keep the process focused on a single executable file.
            noMsi: true 
        });
        console.log("Mission accomplished. Your installer is ready in the installers folder.");
    } catch (error) {
        console.log("The construction process failed with the following error: " + error.message);
    }
}

createExecutable();