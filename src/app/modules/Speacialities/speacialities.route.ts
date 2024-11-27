import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesValidtaion } from "./specialties.validation";
import { SpecialtiesController } from "./speacialities.controller";
import { fileUploader } from "../../helpers/fileUploader";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data));
    return SpecialtiesController.inserIntoDB(req, res, next);
  }
);

export const SpeacialitiesRoutes = router;
