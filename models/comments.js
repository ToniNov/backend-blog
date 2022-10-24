import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    avatarUrl: String
}, {
    timestamps: true
},
)

export default mongoose.model('Comments', CommentSchema)