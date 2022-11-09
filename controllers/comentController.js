import PostModel from "../models/post.js";
import CommentModel from "../models/comments.js";


export const createComment = async (req, res) => {
    try {
     const { postId, comment } = req.body

     if(!comment)
         return res.json({message: 'The comment cannot be empty'})

     const newComment = new CommentModel({comment})
     await newComment.save()

     try {
         await PostModel.findByIdAndUpdate(postId,{
             $push: {comments: newComment._id}
         })
     } catch (err) {
         console.log(err)
     }

     res.json(newComment)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to create an comment.'
        })
    }
}
