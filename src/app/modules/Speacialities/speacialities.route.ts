import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesValidtaion } from "./specialties.validation";
import { SpecialtiesController } from "./speacialities.controller";
import { fileUploader } from "../../helpers/fileUploader";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data));
    return SpecialtiesController.inserIntoDB(req, res, next);
  }
);

router.get("/", SpecialtiesController.getAllFromDB);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SpecialtiesController.deleteFromDB
);

export const SpeacialitiesRoutes = router;
