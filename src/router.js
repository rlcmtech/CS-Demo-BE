import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// Correct route path
router.post("/admin/create-users", createUser);

export default router;
