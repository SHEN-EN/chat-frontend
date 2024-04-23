import { app, BrowserWindow } from "electron";
import table from "../src/SQLite/config/db.json";
import path from "path";
let win: BrowserWindow | null;
app.setPath("userData", `${app.getPath("userData")} - Instance2`);
const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
let db = null;

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
    db.close();
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
  ipcMain.handle("rundb", async (event, options) => {
    return new Promise((resolve, reject) => {
      const { query, params } = options;
      if (query.indexOf("select") !== -1) {
        db.all(query, params || [], (err, rows) => {
          if (err) {
            console.log("error:", err);
            reject(err);
          }
          resolve(rows);
        });
      } else {
        db.run(query, params || [], (err) => {
          if (err) {
            console.log("error:", err);
            reject(err);
          }
          resolve(200);
        });
      }
    });
  });
  ipcMain.handle("initdb", (event, args) => {
    const fs = require("fs");

    fs.mkdir(
      path.resolve(__dirname, `../src/SQLite/${args}`),
      { recursive: true },
      (err) => {
        if (err) {
          console.error("Error creating folder:", err);
        } else {
          console.log("Folder created successfully");
        }
      }
    );

    const dbPath = path.resolve(__dirname, `../src/SQLite/${args}/ChatMsg.db`);
    db = new sqlite3.Database(dbPath);
    createSQLiteDatabase();
  });
};
const sendEvent = () => {
  ipcMain.handle("get-is-maximized", () => {
    return win ? win.isMaximized() : false;
  });
};
const createSQLiteDatabase = () => {
  // 创建表
  db.serialize(() => {
    table.tableOptions.forEach((table) => {
      const { tableName, index } = table;
      console.log(tableName);
      
      let sql = `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY`;

      index.forEach(({ name }) => {
        sql += `, ${name} TEXT`;
      });

      sql += ")";

      db.run(sql, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Table ${tableName} created successfully`);
      });
    });
  });
};
app.whenReady().then(() => {
  createWindow();
  receiveEvent();
  sendEvent();
});
