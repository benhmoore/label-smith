import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const dbPromise = open({
    filename: "./files.db",
    driver: sqlite3.Database,
});

// Initialize the database with a table for files, if it doesn't exist
export async function initializeDatabase() {
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
