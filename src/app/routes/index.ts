import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { SpeacialitiesRoutes } from "../modules/Speacialities/speacialities.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpeacialitiesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
