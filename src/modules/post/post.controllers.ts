import { Request, Response } from "express";
import { PostServices } from "./post.services";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.createPost(req.body);

    res.status(201).send({
      success: true,
      message: "Post Created Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Post Creation Failed.",
      data: null,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured === "true" ? true : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const sort = req.query.sort as string;

    const result = await PostServices.getAllPost({
      page,
      limit,
      search,
      isFeatured,
      tags,
      sort,
    });

    res.status(200).send({
      success: true,
      message: "All Posts Retrieved Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong.",
      data: null,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.getPostById(Number(req.params.id));

    res.status(200).send({
      success: true,
      message: "User Retrieved Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong.",
      data: null,
    });
  }
};

const deleteAllPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.deleteAllPost();

    res.status(200).send({
      success: true,
      message: "All Users Deleted Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "User Creation Failed.",
      data: null,
    });
  }
};

const getBlogStat = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.getBlogStat();

    res.status(200).send({
      success: true,
      message: "Post Stats Retrieved Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      data: null,
    });
  }
};

export const PostControllers = {
  createPost,
  getAllPost,
  getPostById,
  deleteAllPost,
  getBlogStat,
};
