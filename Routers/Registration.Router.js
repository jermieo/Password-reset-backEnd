import express from "express";
import {
  registerUser,
  loginUser,
  getbyId,
  nodemailerLink,
  resetpassword,
} from "../Controllers/Registration.controller.js";
import authMiddleware from "../Middleware/auth.Middleware.js";
const router = express.Router();
router.post("/create", registerUser);
router.post("/login", loginUser);
router.get("/getbyid", authMiddleware, getbyId);
router.post("/nodemailer/link", nodemailerLink);
router.post("/reset/password", resetpassword);

export default router;
