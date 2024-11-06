import express from "express";
import { AdminController } from "./admin.controlller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getAdminById);

export const AdminRoutes = router;
