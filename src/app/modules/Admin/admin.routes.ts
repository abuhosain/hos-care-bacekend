import express from "express";
import { AdminController } from "./admin.controlller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getAdminById);

router.patch("/:id", AdminController.updateAdminIntoDb);

router.delete("/:id", AdminController.deleteFromDb);

router.delete("/soft/:id", AdminController.softDeleteFromDb);

export const AdminRoutes = router;
