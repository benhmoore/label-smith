import express from "express";
import {
    listFiles,
    fileContent,
    syncFile,
} from "../controllers/fileController";

const router = express.Router();

router.get("/list-files", listFiles);
router.get("/file-content", fileContent);
router.post("/sync-file", syncFile);

export default router;
