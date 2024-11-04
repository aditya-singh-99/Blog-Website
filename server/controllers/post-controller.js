import Post from "../models/Post.js"

export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body)
        post.save()
        res.status(200).json({ msg: 'Post created Successfully' })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllPosts = async (req, res) => {
    let category = req.query.category
    let query = {}
    if (req.query.category)
        query = { ...query, categories: category }
    try {
        const posts = await Post.find(query)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: 'Post not Found' })
        }
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json({ msg: 'Post updated Successfully' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: 'Post not Found' })
        }
        await post.deleteOne()
        res.status(200).json({ msg: 'Post deleted Successfully' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}