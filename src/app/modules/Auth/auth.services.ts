import { prisma } from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { JwtHelpers } from "../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "./emailSender";
import { string } from "zod";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refrshToken = async (token: string) => {
  let decodeToken;
  try {
    decodeToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token as Secret
    );
    console.log(decodeToken);
  } catch (err) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodeToken?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    "abcdefg",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "password change successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = JwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_pass_token as Secret,
    config.jwt.reset_pass_token_expire_in as string
  );
  console.log(resetPassToken);
  const resetPassLink =
    config.reset_pass_link + `?email=${userData.email}&token=${resetPassToken}`;
  console.log(resetPassLink);
  await emailSender(
    userData.email,
    `    <div>
    <p>Dear User</p>
    <p>Your reset password link 
      <a href=${resetPassLink}>
          <button>Reset Password</button>
      </a>
    </p>
    </div>`
  );
};

const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = JwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_token as Secret
  );
  console.log(isValidToken);
  if (!isValidToken) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }

  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
};

export const AuthServices = {
  loginUser,
  refrshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
