import express from 'express'
import mongoose from "mongoose"
import multer from 'multer'
import cors from 'cors'
import fs from "fs";


import {UserController, PostController} from './controllers/index.js'
import {handleValidationErrors, checkAuth} from "./utils/index.js";

import {registerValidation, loginValidation, postCreateValidation} from './validations/validations.js'


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
// AUTH
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)
//
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})
//TAGS
app.get('/tags', PostController.getLastTags)
//POST
app.get('/posts', PostController.getAll)
app.get('/posts/popular', PostController.getPopular)
// todo post by tags
//app.get('/posts/:tag', PostController.getByTag)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.listen(process.env.PORT || 7654, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK', Date.now())
})