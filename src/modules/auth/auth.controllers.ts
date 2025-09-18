import { Request, Response } from "express";
import { AuthServices } from "./auth.services";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginWithEmailAndPassword(req.body);

    res.status(200).send({
      success: true,
      message: "User Logged In Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "User Login Failed.",
      data: null,
    });
  }
};

export const AuthControllers = {
  loginWithEmailAndPassword,
};
