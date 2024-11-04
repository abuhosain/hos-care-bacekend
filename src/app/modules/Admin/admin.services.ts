import { PrismaClient } from "@prisma/client";

const prsima = new PrismaClient();

const getAllAdmin = async (params: any) => {
  const andConditions = [];
  if (params.searchTerm) {
    andConditions.push({
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
    });
  }

  const whereConditions = { AND: andConditions };

  const result = await prsima.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminServices = {
  getAllAdmin,
};
