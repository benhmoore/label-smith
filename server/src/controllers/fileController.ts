import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { dbPromise } from "../db/db";

export const listFiles = async (req: Request, res: Response) => {
    const directoryPath = path.join(__dirname, "../../../dropbox");
    fs.readdir(directoryPath, (err, files) => {
        if (err) return res.status(500).send("Unable to scan directory");
        res.send(files);
    });
};

export const fileContent = async (req: Request, res: Response) => {
    const filePath = path.join(
        __dirname,
        "../../../dropbox",
        req.query.fileName as string
    );
    fs.readFile(filePath, "utf8", (err, content) => {
        if (err) return res.status(500).send("Unable to read file");
        res.send(content);
    });
};

export const syncFile = async (req: Request, res: Response) => {
    const { fileName, content } = req.body;
    const db = await dbPromise;
    await db.run("INSERT INTO files (name, content) VALUES (?, ?)", [
        fileName,
        content,
    ]);
    res.send("File synced successfully");
};
