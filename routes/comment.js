import {Router} from "express";
import {checkAuth} from "../utils/index.js";
import {CommentController} from '../controllers/index.js'


const router = new Router()

// Create comment for post
//http://localhost:7654/api/comments/:id
router.post('/:id', checkAuth, CommentController.createComment)

export default router