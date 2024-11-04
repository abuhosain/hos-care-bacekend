import { PrismaClient } from "@prisma/client";

const prsima = new PrismaClient();

const getAllAdmin = async () => {
  const result = await prsima.admin.findMany();
  return result;
};

export const AdminServices = {
  getAllAdmin,
};
