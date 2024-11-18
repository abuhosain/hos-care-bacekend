import { access } from "fs";
import catchAsynch from "../../../shared/catchAsynch";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.services";
import { Request, Response } from "express";

const loginUser = catchAsynch(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsynch(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refrshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "AccessToken Generatesuccessfully",
    data: result,
    // data: {
    //   accessToken: result.accessToken,
    //   needPasswordChange: result.needPasswordChange,
    // },
  });
});

const changePassword = catchAsynch(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await AuthServices.changePassword(req.user, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "password change successfully",
      data: result,
    });
  }
);

const forgotPassword = catchAsynch(async (req, res) => {
  await AuthServices.forgotPassword(req.body);
  console.log(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email",
    data: null,
  });
});

const resetPassword = catchAsynch(async (req, res) => {
  const token = req.headers.authorization || "";
  // console.log(token);
  await AuthServices.resetPassword(token, req.body);
  // console.log(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "password reset successfully",
    data: null,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
