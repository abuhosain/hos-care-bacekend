import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controlller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validaton";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAllAdmin
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAdminById
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(AdminValidation.adminUpdate),
  AdminController.updateAdminIntoDb
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteFromDb
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.softDeleteFromDb
);

export const AdminRoutes = router;
