import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "HosCare server running...",
  });
});

app.use("/api/v1/user", UserRoutes);

export default app;
