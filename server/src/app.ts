import express from "express";
import path from "path";
import fileRoutes from "./routes/fileRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../label-smith/dist")));

// Routes
app.use("/api", fileRoutes);

export default app;
