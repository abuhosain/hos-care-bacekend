import e, { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.contstance";
import sendResponse from "../../../shared/sendResponse";

const catchAsynch = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const getAllAdmin: RequestHandler = catchAsynch(async (req, res) => {
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
});

const getAdminById = catchAsynch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminServices.getAdminById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin fetched by id successfully",
    data: result,
  });
});

const updateAdminIntoDb = catchAsynch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await AdminServices.updatAdminIntoDb(id, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const deleteFromDb = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AdminServices.deleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  }
);

const softDeleteFromDb = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await AdminServices.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  }
);
export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdminIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
