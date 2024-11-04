import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAllAdmin(req.query);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Admin fetched failed",
      error: err,
    });
  }
};

export const AdminController = {
  getAllAdmin,
};
