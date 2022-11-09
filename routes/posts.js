import {Router} from "express";
import {checkAuth, handleValidationErrors} from "../utils/index.js";
import {postCreateValidation} from "../validations/validations.js";
import {PostController} from '../controllers/index.js'

const router = new Router()

//Get last tags
//http://localhost:7654/api/posts/tags
router.get('/tags', PostController.getLastTags)

//Get by tags
//http://localhost:7654/api/posts/tags/:tag
router.get('/tags/:tag', PostController.getByTag)

//Get all posts
//http://localhost:7654/api/posts
router.get('/', PostController.getAll)

//Get popular posts
//http://localhost:7654/api/posts/popular
router.get('/popular', PostController.getPopular)

//Get one post
//http://localhost:7654/api/posts/:id
router.get('/:id', PostController.getOne)

//Get create post
//http://localhost:7654/api/posts/:id
router.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)

//Get remove post
//http://localhost:7654/api/posts/:id
router.delete('/:id', checkAuth, PostController.remove)

//Get update post
//http://localhost:7654/api/posts/:id
router.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

//Get post comments
//http://localhost:7654/api/posts/comments/:id
router.get('/comments/:id',  PostController.getPostComments)


export default router
