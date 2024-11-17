import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/", auth("ADMIN", "SuperAdmin"), UserController.createAdmin);

export const UserRoutes = router;
