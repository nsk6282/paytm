const express = require('express');
const userRouter = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middleware');

/// ---- the zod schemas required -------
const signupSchema = zod.object({
    username:zod.string().email(),
    firstName:zod.string().max(50),
    lastName:zod.string().max(50),
    password:zod.string().min(6)
})

const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

const updateSchema = zod.object({
    firstName:zod.string().max(50).optional(),
    lastName:zod.string().max(50).optional(),
    password:zod.string().min(6).optional()
})

userRouter.use(express.json());

userRouter.post('/signup',async (req,res)=>{
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const data = await User.findOne({
        username:req.body.username
    })
    if(data){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const user = await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    });
    const userId = user._id;
    const account = Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId:userId
    }, JWT_SECRET);
    res.status(200).json({
        message:"User created successfully",
        token :token
    })
})

userRouter.post('/signin',async (req,res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Error while logging in"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!user){
        return res.status(411).json({
            message:"Error while logging in"
        })
    }
    const userId = user._id;
    const token = jwt.sign({
        userId:userId
    }, JWT_SECRET);
    res.status(200).json({
        token :token
    })

})

userRouter.put('/',authMiddleware, async (req,res)=>{
    const userId = req.userId;
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    const  user  = await User.updateOne({_id:userId},req.body);
    res.status(200).json({
        message: "Updated successfully"
    })



})
userRouter.get('/name',authMiddleware, async(req,res)=>{
    const userId = req.userId;
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    const  user  = await User.findOne({_id:userId});
    res.status(200).json({
        message: "Updated successfully",
        name:user.firstName + " " + user.lastName
    })

})
userRouter.get('/bulk',authMiddleware, async (req,res)=>{
    const userId = req.userId;
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    const filter = req.query.filter || "";
    var users = await User.find({
        $and: [{
            _id:{$ne:userId}
        },
       { $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]}]   
    }
    ).select(["_id", "username","firstName","lastName"]);
    res.status(200).json(users);
})

module.exports = userRouter;