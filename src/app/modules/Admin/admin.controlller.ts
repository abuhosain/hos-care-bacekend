import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

const getAllAdmin = async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdmin();
  res.status(200).json({
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
};

export const AdminController = {
  getAllAdmin,
};
