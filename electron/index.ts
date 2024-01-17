import { app, BrowserWindow } from "electron";
import path from "path";
let win: BrowserWindow | null;
const { ipcMain } = require("electron");
const Store = require("electron-store");
const electronStore = new Store();
const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      devTools: true,
      // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    height: 600,
    width: 1000,
  });

  if (process.env.NODE_ENV != "development") {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }
  win.webContents.openDevTools();
};
const receiveEvent = () => {
  ipcMain.on("minimize", () => {
    win && win.minimize();
  });
  ipcMain.on("quit", () => {
    app.quit();
  });

  ipcMain.on("maximize", () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }
  });

  ipcMain.on("start-drag", (event) => {
    const { screen, BrowserWindow } = require("electron");
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = BrowserWindow.fromWebContents(event.sender);

    win.on("will-move", (e, newBounds) => {
      // Prevent window from being moved outside of the screen
      if (newBounds.x < 0) newBounds.x = 0;
      if (newBounds.y < 0) newBounds.y = 0;
      if (newBounds.x > width - newBounds.width)
        newBounds.x = width - newBounds.width;
      if (newBounds.y > height - newBounds.height)
        newBounds.y = height - newBounds.height;

      // Update window position
      win!.setBounds(newBounds);
    });
  });
  ipcMain.on("setStore", (event, arg: { key: string; value: any }) => {
    if (!("key" in arg)) return;
    const { key, value } = arg;

    if(electronStore.get(key)) electronStore.delete(key);

    electronStore.set(key, value);
  });
};
const sendEvent = () => {
  ipcMain.handle("get-is-maximized", () => {
    return win ? win.isMaximized() : false;
  });
  ipcMain.handle("getStore", (event, key: string) => {
    if (!key) return;
    return electronStore.get(key);
  });
};
app.whenReady().then(() => {
  createWindow();
  receiveEvent();
  sendEvent();
});
