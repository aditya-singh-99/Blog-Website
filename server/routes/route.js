import express from "express";
import { loginUser, signupUser } from "../controllers/user-controller.js";
import { getImage, uploadImage } from "../controllers/image-controller.js";
import upload from "../utils/upload.js";
import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controllers/post-controller.js";
import { authenticateToken } from "../controllers/jwt-controller.js";
import { deleteComment, getComments, newComment } from "../controllers/comment-controller.js";

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)

router.post('/file/upload', upload.single('file'), uploadImage)
router.get('/file/:filename', getImage)

router.post('/create', authenticateToken, createPost)
router.get('/posts', authenticateToken, getAllPosts)
router.get('/post/:id', authenticateToken, getPost)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)

router.post('/comment/new', authenticateToken, newComment)
router.get('/comments/:id', authenticateToken, getComments)
router.delete('/comment/delete/:id', authenticateToken, deleteComment)

export default router