import Post from "../models/post.model.js"
export const createPost = async(req,res)=>{
    const post = await Post.create({
        title:req.body.title,
        content:req.body.content,
        Userid:req.User.id
    })
    res.json(post);
}
export const getpost = async(req,res)=>{
    const posts = await Post.findAll({
        where:{Userid:req.id}
    })
    res.json(posts)
}