const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserModel = require('../../models/UserModel');
router.get('/',(req,res) => {
        if(req.query.type == "validate"){
            UserModel.findOne({email:req.query.email})
            .then((user) => {
                if(bcrypt.compareSync(req.query.password, user.password)) {
                    res.json(user)    
                   } else {
                    res.json({email:''})
                   }
                })
            .catch(err=>{console.log(err)});           
        }else{    
        UserModel.find({email:req.query.email})
        .then((users) => {
            res.json(users)})   
        } 
});

router.post('/',(req,res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new UserModel({
        name : req.body.name,
        email:req.body.email,
        password:hash
    });
    newUser.save()
        .then(user => res.json(user));    
});


module.exports = router;