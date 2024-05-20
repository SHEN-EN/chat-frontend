"use strict";
const electron = require("electron");
const path = require("path");
const tableOptions = [
  {
    tableName: "tb_chatList",
    option: {
      autoIncrement: true
    },
    index: [
      {
        name: "avatar",
        keyPath: "avatar"
      },
      {
        name: "lastmessage",
        keyPath: "lastmessage"
      },
      {
        name: "lasttime",
        keyPath: "lasttime"
      },
      {
        name: "username",
        keyPath: "username"
      },
      {
        name: "uuid",
        keyPath: "uuid"
      },
      {
        name: "unreadnums",
        keyPath: "unreadnums"
      }
    ]
  },
  {
    tableName: "tb_chatMsg",
    option: {
      autoIncrement: true
    },
    index: [
      {
        name: "avatar",
        keyPath: "avatar"
      },
      {
        name: "message",
        keyPath: "message"
      },
      {
        name: "sendertime",
        keyPath: "sendertime"
      },
      {
        name: "uuid",
        keyPath: "uuid"
      },
      {
        name: "messagetype",
        keyPath: "messagetype"
      }
    ]
  }
];
const table = {
  tableOptions
};
let win;
electron.app.setPath("userData", `${electron.app.getPath("userData")} - Instance2`);
const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
let db = null;
let uuid = null;
const createWindow = () => {
  win = new electron.BrowserWindow({
    webPreferences: {
      devTools: true,
      // 集成网页和 Node.js，也就是在渲染进程中，可以调用 Node.js 方法
      nodeIntegration: true,
      contextIsolation: false
    },
    frame: false,
    height: 600,
    width: 1e3
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
    electron.app.quit();
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
    const { screen, BrowserWindow: BrowserWindow2 } = require("electron");
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win2 = BrowserWindow2.fromWebContents(event.sender);
    win2.on("will-move", (e, newBounds) => {
      if (newBounds.x < 0)
        newBounds.x = 0;
      if (newBounds.y < 0)
        newBounds.y = 0;
      if (newBounds.x > width - newBounds.width)
        newBounds.x = width - newBounds.width;
      if (newBounds.y > height - newBounds.height)
        newBounds.y = height - newBounds.height;
      win2.setBounds(newBounds);
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
    uuid = args;
    const dbPath = path.resolve(
      __dirname,
      `../src/SQLite/${args}/msg/ChatMsg.db`
    );
    db = new sqlite3.Database(dbPath);
    createSQLiteDatabase();
  });
  ipcMain.handle("download-file", (_, args) => {
    let { fileInfo, data } = args;
    const filePath = path.join(
      __dirname,
      `../src/SQLite/${uuid}/file/${fileInfo.name}`
    );
    console.log(data);
    data = Buffer.from(data);
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(data);
    writeStream.on("drain", function() {
      writeStream.close();
      console.log("Data has been drained");
    });
    writeStream.on("error", function(err) {
      console.error("Error when writing data to file:", err);
    });
  });
  ipcMain.handle("init-basedir", (_, args) => {
    for (const key in args) {
      fs.mkdir(
        path.resolve(__dirname, `../src/SQLite/${args[key]}`),
        { recursive: true },
        (err) => {
          if (err) {
            console.error("Error creating folder:", err);
          } else {
            console.log("Folder created successfully");
          }
        }
      );
    }
  });
};
const sendEvent = () => {
  ipcMain.handle("get-is-maximized", () => {
    return win ? win.isMaximized() : false;
  });
};
const createSQLiteDatabase = () => {
  db.serialize(() => {
    table.tableOptions.forEach((table2) => {
      const { tableName, index } = table2;
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
electron.app.whenReady().then(() => {
  createWindow();
  receiveEvent();
  sendEvent();
});
