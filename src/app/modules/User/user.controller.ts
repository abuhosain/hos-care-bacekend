import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = catchAsynch(async (req, res, next) => {
  const result = await UserService.createAdmin(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const createDoctor = catchAsynch(async (req, res, next) => {
  const result = await UserService.createDoctor(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

const createPatient = catchAsynch(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient Created successfuly!",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
};
