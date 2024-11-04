import { Prisma, PrismaClient } from "@prisma/client";

const prsima = new PrismaClient();

const getAllAdmin = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];
  const adminSearchAbleFields = ["name", "email"];
  console.log(filterData);

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData.length > 0)) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prsima.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminServices = {
  getAllAdmin,
};
