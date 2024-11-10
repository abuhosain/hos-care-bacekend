import { prisma } from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { JwtHelpers } from "../../helpers/jwtHelpers";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
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
    "abcdefg",
    "5m"
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    "abcdefgh",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refrshToken = async (token: string) => {
  let decodeToken: any;
  try {
    decodeToken = jwt.verify(token, "abcdefgh");
    console.log(decodeToken);
  } catch (err) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodeToken?.email,
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
