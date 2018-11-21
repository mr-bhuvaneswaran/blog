const express = require('express')
const router = express.Router();

const BlogModel = require('../../models/BlogModel');

router.get('/',(req,res) => {
    BlogModel.find()
    .then((blogs) => res.json(blogs))
});

router.post('/',(req,res) => {
    const newBlog = new BlogModel({
        author: req.body.author,
        date: req.body.date,
        image:req.body.image,
        likes: req.body.likes,
        title: req.body.title,
        context: req.body.context,
        comments: req.body.comments,
        dislikes: req.body.dislikes,
        uid: req.body.uid
    });
    newBlog.save()
        .then(blog => res.json(blog));    
});

router.put('/',(req,res)=>{
    switch(req.body.type){
        case "comment":
            BlogModel.findOneAndUpdate({_id:req.body.id},{$push: {comments:req.body.comment}},{new: true},
                (err,doc)=>{
                    return res.json({comments:doc.comments});
            });            
            break;
        case "likes":
            BlogModel.findOneAndUpdate({_id:req.body._id},{comments:req.body.likes},
                (doc)=>{
                    console.log(doc);
            });            
        break;
        default :
        BlogModel.findOneAndUpdate({_id:req.body._id},{comments:req.body.dislikes},
            (doc)=>{
                console.log(doc);
        });            
    }
    
});


module.exports = router;