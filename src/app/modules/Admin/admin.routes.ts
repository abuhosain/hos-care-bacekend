import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controlller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validaton";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getAdminById);

router.patch(
  "/:id",
  validateRequest(AdminValidation.adminUpdate),
  AdminController.updateAdminIntoDb
);

router.delete("/:id", AdminController.deleteFromDb);

router.delete("/soft/:id", AdminController.softDeleteFromDb);

export const AdminRoutes = router;
