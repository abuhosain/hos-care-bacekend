import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.contstance";

const prisma = new PrismaClient();

const calculatePagination = (options: {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (Number(page) - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

const getAllAdmin = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

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

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrderf
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updatAdminIntoDb = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteFromDb = async (id: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDelete = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    const userDelete = await transactionClient.user.delete({
      where: {
        email: adminDelete.email,
      },
    });

    return adminDelete;
  });

  return result;
};

export const AdminServices = {
  getAllAdmin,
  getAdminById,
  updatAdminIntoDb,
  deleteFromDb,
};
