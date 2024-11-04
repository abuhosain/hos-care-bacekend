import { PrismaClient } from "@prisma/client";

const prsima = new PrismaClient();

const getAllAdmin = async (params: any) => {
  console.log({ params });
  const result = await prsima.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return result;
};

export const AdminServices = {
  getAllAdmin,
};
