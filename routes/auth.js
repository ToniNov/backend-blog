import {Router} from "express";
import {loginValidation, registerValidation} from "../validations/validations.js";
import {checkAuth, handleValidationErrors} from "../utils/index.js";
import {UserController} from "../controllers/index.js"

const router = new Router()
// Auth
//http://localhost:7654/api/auth/login
router.post('/login', loginValidation, handleValidationErrors, UserController.login)
//Register
//http://localhost:7654/api/auth/register
router.post('/register', registerValidation, handleValidationErrors, UserController.register)
// Get me
//http://localhost:7654/api/auth/me
router.get('/me', checkAuth, UserController.getMe)

export default router