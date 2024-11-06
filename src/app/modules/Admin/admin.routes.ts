import express from "express";
import { AdminController } from "./admin.controlller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getAdminById);

router.patch("/:id", AdminController.updateAdminIntoDb);

export const AdminRoutes = router;
