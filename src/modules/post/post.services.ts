import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
  });

  return result;
};

const getAllPost = async ({
  page = 1,
  limit = 2,
  search,
  isFeatured,
  tags,
  sort,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  sort?: string;
}) => {
  console.log(page, limit, search, isFeatured, tags, sort);
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },

      typeof isFeatured === "boolean" && { isFeatured },
      tags &&
        tags.length > 0 && {
          tags: {
            hasEvery: tags,
          },
        },
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    skip: limit * (page - 1),
    take: limit,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    where,
    orderBy: {
      createdAt: sort && sort === "asc" ? "asc" : "desc",
    },
  });

  const total = await prisma.post.count({ where });

  return {
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getPostById = async (postId: any) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return await tx.post.findMany({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  });

  return result;
};

const deleteAllPost = async () => {
  return await prisma.post.deleteMany();
};

const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: {
        isFeatured: true,
      },
      orderBy: {
        views: "desc",
      },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekPostCount = await tx.post.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return {
      stats: {
        totalPost: aggregates._count ?? 0,
        totalViews: aggregates._sum.views ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
        minViews: aggregates._min.views ?? 0,
      },
      featured: {
        count: featuredCount,
        topPost: topFeatured,
      },
      lastWeekPostCount,
    };
  });
};

export const PostServices = {
  createPost,
  getAllPost,
  getPostById,
  deleteAllPost,
  getBlogStat,
};
