import Comment from "../models/Comment.js"

export const newComment = async (req, res) => {
    try {
        const comment = await new Comment(req.body)
        comment.save()
        res.status(200).json({ msg: 'Comment saved Successfully' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not Found' })
        }
        await comment.deleteOne()
        res.status(200).json({ msg: 'Comment deleted Successfully' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}