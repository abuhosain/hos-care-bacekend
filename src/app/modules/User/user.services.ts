import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { fileUploader } from "../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
  const file: IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    console.log(uploadToCloudinary);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  console.log(hashedPassword);
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};
const createDoctor = async (req: any) => {
  const file: IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log(uploadToCloudinary);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
    console.log(req.body);
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  console.log(hashedPassword);
  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};

export const UserService = {
  createAdmin,
  createDoctor,
};
