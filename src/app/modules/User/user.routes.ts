import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { JwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized");
      }
      const verifiedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      console.log(verifiedUser);
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You are not authorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post("/", auth("ADMIN", "SuperAdmin"), UserController.createAdmin);

export const UserRoutes = router;
