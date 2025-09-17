import { Router } from "express";
import { PostControllers } from "./post.controllers";

const router = Router();

router.post("/", PostControllers.createPost);
router.get("/", PostControllers.getAllPost);
router.get("/:id", PostControllers.getPostById);
router.delete("/delete", PostControllers.deleteAllPost);

export const PostRoutes = router;