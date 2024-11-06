import express from "express";
import { AdminController } from "./admin.controlller";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getAdminById);

router.patch("/:id", AdminController.updateAdminIntoDb);

router.delete("/:id", AdminController.deleteFromDb);

export const AdminRoutes = router;
