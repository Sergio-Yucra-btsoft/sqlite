const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = process.env.IS_DEV == "true" ? true : false;
let data = { message: 'Hola AAAAAAAAAAAA' };
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1900,
    height: 850,
    autoHideMenuBar: true,
    resizable: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    //mainWindow.webContents.openDevTools();
  }
  ipcMain.handle('get-data', () => {
    return data; 
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
