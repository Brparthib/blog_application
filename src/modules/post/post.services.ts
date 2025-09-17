import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
  });

  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany({
    include: {
        author: {
            select: {
                id: true,
                name: true,
                email: true
            }
        }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getPostById = async (postId: any) => {
  console.log(postId);
  const result = await prisma.post.findMany({
    where: {
      id: postId,
    },
  });

  return result;
};

const deleteAllPost = async () => {
  return await prisma.post.deleteMany();
};

export const PostServices = {
  createPost,
  getAllPost,
  getPostById,
  deleteAllPost,
};
