import express, { Request, Response } from "express";
import { AdminController } from "./admin.controlller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);
export const AdminRoutes = router;
