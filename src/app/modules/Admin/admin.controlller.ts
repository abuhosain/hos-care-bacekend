import { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.contstance";
import sendResponse from "../../../shared/sendResponse";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await AdminServices.getAllAdmin(filters, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: err?.name || "Admin fetched failed",
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.getAdminById(id);
    sendResponse(res, {
      statusCode: 200,
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

    sendResponse(res, {
      statusCode: 200,
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

const deleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminServices.deleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Admin deleted failed",
      error: err,
    });
  }
};

const softDeleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.softDeleteFromDb(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Admin deleted failed",
      error: err,
    });
  }
};

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdminIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
