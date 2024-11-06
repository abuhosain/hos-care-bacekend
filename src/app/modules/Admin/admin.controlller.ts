import { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.contstance";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdminServices.getAllAdmin(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Admin fetched failed",
      error: err,
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.getAdminById(id);
    res.status(200).json({
      success: true,
      message: "Admin fetched by id successfully",
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

const updateAdminIntoDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const result = await AdminServices.updatAdminIntoDb(id, updatedData);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Admin update failed",
      error: err,
    });
  }
};

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdminIntoDb,
};
