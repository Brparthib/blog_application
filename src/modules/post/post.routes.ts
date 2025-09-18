import { Router } from "express";
import { PostControllers } from "./post.controllers";

const router = Router();

router.post("/", PostControllers.createPost);
router.get("/", PostControllers.getAllPost);
router.get("/stats", PostControllers.getBlogStat);
router.delete("/delete", PostControllers.deleteAllPost);
router.get("/:id", PostControllers.getPostById);

export const PostRoutes = router;
