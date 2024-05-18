import express from "express";
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../../label-smith/dist")));

const dbPromise = open({
  filename: "./files.db",
  driver: sqlite3.Database,
});

async function initializeDatabase() {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);
}

initializeDatabase();

app.get("/api/list-files", async (req, res) => {
  const directoryPath = path.join(__dirname, "../../dropbox");
  fs.readdir(directoryPath, (err, files) => {
    if (err) return res.status(500).send("Unable to scan directory");
    res.send(files);
  });
});

app.get("/api/file-content", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "../../dropbox",
    req.query.fileName as string,
  );
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) return res.status(500).send("Unable to read file");
    res.send(content);
  });
});

app.post("/api/sync-file", async (req, res) => {
  const { fileName, content } = req.body;
  const db = await dbPromise;
  await db.run("INSERT INTO files (name, content) VALUES (?, ?)", [
    fileName,
    content,
  ]);
  res.send("File synced successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
