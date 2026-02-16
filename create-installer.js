const builder = require('electron-builder');
const Platform = builder.Platform;

console.log("Beginning the build... creating Standard Windows Installer (NSIS).");

// This script uses electron-builder to create a standard Setup Wizard
// instead of the Squirrel (one-click) installer.
async function createBuilderInstaller() {
    try {
        // electron-builder handles both the packaging and the installer creation
        await builder.build({
            targets: Platform.WINDOWS.createTarget(),
            config: {
                appId: "com.easyronin01.operationscalculator",
                productName: "Operations Calculator",
                copyright: "Copyright © 2026 Operations Team",
                directories: {
                    // This is where the installer will appear
                    output: "dist/installer"
                },
                win: {
                    // 'nsis' is the standard Windows installer type
                    target: "nsis",
                    // Ensure you have an icon.png in your folder, or remove this line
                    icon: "icon.png"
                },
                nsis: {
                    // Setting this to false creates the "Wizard" style (Next -> Next -> Finish)
                    oneClick: false,
                    // Allows the user to choose where to install the app
                    allowToChangeInstallationDirectory: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    shortcutName: "Operations Calculator"
                },
                // Ensures we include the necessary files
                files: [
                    "**/*",
                    "!dist/*",
                    "!node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
                    "!create-installer.js" 
                ]
            }
        });
        console.log("Success! The installer is ready in dist/installer.");
    } catch (e) {
        console.log(`The build failed: ${e.message}`);
    }
}

createBuilderInstaller();