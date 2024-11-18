import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";

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

export const UserController = {
  createAdmin,
  createDoctor,
};
