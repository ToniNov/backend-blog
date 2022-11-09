import PostModel from "../models/post.js";
import CommentModel from "../models/comments.js";

export const getAll = async (req, res) => {
    try {
        const post = await PostModel.find({}).sort({createdAt: -1}).exec();

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get the article.'
        })
    }
}

export const getPopular = async (req, res) => {
    try {
        const post = await PostModel.find({}).sort({viewsCount: -1}).exec()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get the popular article.'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {_id: postId},
            {$inc: {viewsCount: 1}},
            {returnDocument: 'after'},
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Failed to return the article.'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found'
                    })
                }

                res.json(doc)
            }
        ).populate('user')
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get the article.'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
                _id: postId
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({
                        message: 'Failed to delete the article.'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Article not found'
                    })
                }
                res.json({
                    success: true
                })
            })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get the article.'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.updateOne({
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId
            })
        res.json({
            success: true
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to update the article.'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to create an article.'
        })
    }
}

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get the article.'
        })
    }
}

export const getByTag = async (req, res) => {
    try {
        const params = req.params

        const posts = await PostModel.find(
            {"tags": {$in: [params.tag]}},
        )
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get the article by tag.'
        })
    }
}

export const getPostComments = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)

        const list = await Promise.all(
           post.comments.map((comment)=> {
               return CommentModel.findById(comment)
           })
        )

        res.json(list)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to get comments'
        })
    }
}
