import { prisma } from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { JwtHelpers } from "../../helpers/jwtHelpers";
import { UserStatus } from "@prisma/client";
import config from "../../config";
import { Secret } from "jsonwebtoken";

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
    decodeToken = JwtHelpers.verifyToken(token, "abcdefgh");
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

export const AuthServices = {
  loginUser,
  refrshToken,
};
