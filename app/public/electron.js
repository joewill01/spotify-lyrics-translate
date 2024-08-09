const { app, components, BrowserWindow } = require('electron')  

app.commandLine.appendSwitch('widevine-cdm-path', '/Users/joewilliams/Library/Application\ Support/BraveSoftware/Brave-Browser/WidevineCdm/4.10.2710.0/_platform_specific/mac_arm64/libwidevinecdm.dylib')
app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2710.0')



function createWindow () {   
    // Create the browser window.     
    win = new BrowserWindow({
        width: 900,
        minWidth:800,
        height: 600,
        minHeight: 500,
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 12, y: 12 }
    });

    // and load the index.html of the app.
    win.loadURL('http://localhost:3000/');
    win.webContents.openDevTools()


}      


app.whenReady().then(async () => {
    await components.whenReady();
    console.log('components ready:', components.status());
    createWindow();
  });