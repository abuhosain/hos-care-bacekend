import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controlller";
import { AnyZodObject, z } from "zod";

const router = express.Router();

const updatte = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };
};

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getAdminById);

router.patch(
  "/:id",
  validateRequest(updatte),
  AdminController.updateAdminIntoDb
);

router.delete("/:id", AdminController.deleteFromDb);

router.delete("/soft/:id", AdminController.softDeleteFromDb);

export const AdminRoutes = router;
