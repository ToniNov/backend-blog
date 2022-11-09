import express from 'express'
import mongoose from "mongoose"
import multer from 'multer'
import cors from 'cors'
import fs from "fs";

import {checkAuth} from "./utils/index.js";
import authRoute from './routes/auth.js'
import commentRoute from './routes/comment.js'
import postRoute from './routes/posts.js'
import router from "./routes/posts.js";


mongoose
    .connect(
        process.env.MONGODB_URI
        || "mongodb+srv://admin:153246@cluster0.awuhaop.mongodb.net/blog?retryWrites=true&w=majority"
    )
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

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

//Routes
//http://localhost:7654
app.use('/api/auth', authRoute)
app.use('/api/comments', commentRoute)
app.use('/api/posts', postRoute)

app.post('/api/posts/upload', checkAuth, upload.single('image'),(req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})


app.listen(process.env.PORT || 7654, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK', Date.now())
})