import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";

// const createAdmin = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.createAdmin(req.body);
//     res.status(200).json({
//       success: true,
//       message: "Admin created successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err?.name || "Something went wron",
//       error: err,
//     });
//   }
// };
const createAdmin = catchAsynch(async (req, res) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
