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
    const result = await PostServices.getAllPost();

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

    res.status(201).send({
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

export const PostControllers = {
  createPost,
  getAllPost,
  getPostById,
  deleteAllPost,
};
