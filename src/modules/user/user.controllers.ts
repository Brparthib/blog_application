import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createUser(req.body);

    res.status(201).send({
      success: true,
      message: "User Created Successfully.",
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

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();

    res.status(200).send({
      success: true,
      message: "All Users Retrieved Successfully.",
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserById(Number(req.params.id));

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

const updateUserById = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.updateUserById(
      Number(req.params.id),
      req.body
    );

    res.status(200).send({
      success: true,
      message: "User Updated Successfully.",
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

const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.deleteAllUser();

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

export const UserControllers = {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteAllUser,
};
