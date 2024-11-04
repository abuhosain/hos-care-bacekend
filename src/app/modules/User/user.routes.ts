import express, { Request, Response } from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", UserController.createAdmin);

export const UserRoutes = router;
