import e, { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.contstance";
import sendResponse from "../../../shared/sendResponse";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
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
    next(err);
  }
};

const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

const updateAdminIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

const deleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

const softDeleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdminIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
