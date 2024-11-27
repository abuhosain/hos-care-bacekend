import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.services";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constants";
import { IAuthUser } from "../../interfaces/common";

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

const getAllUserFromDb: RequestHandler = catchAsynch(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  // console.log(options);
  const result = await UserService.getAllUserFromDb(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsynch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsynch(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfie = catchAsynch(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserService.updateMyProfie(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile updated!",
      data: result,
    });
  }
);

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUserFromDb,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
