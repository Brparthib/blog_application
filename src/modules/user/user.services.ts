import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });

  return createdUser;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      post: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getUserById = async (userId: any) => {
  console.log(userId);
  const result = await prisma.user.findMany({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserById = async (userId: any, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      role: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteAllUser = async () => {
  return await prisma.user.deleteMany();
};

export const UserServices = {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteAllUser,
};
