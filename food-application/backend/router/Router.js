const express = require('express')
const {body,validationResult} = require('express-validator')
const router = express.Router()
const User = require('../model/UserSchmea')
const userOrder = require('../model/OrderShema')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const OrderShema = require('../model/OrderShema')
const secretKey = 'IAMFULLSTACKTWEBDEVELOPERFOODAPP'

// user registration 
router.post('/createuser',[
body('name','fiedl name').notEmpty(),
body('email','fiedl email').isEmail(),
body('phone','field phone').notEmpty(),
body('password','field password').isLength({min:8}),
body('location','field location').notEmpty()
]
,async (req, res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const salt = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, salt)
    try{
        await User.create({
            name: req.body.name,
            email:req.body.email,
            phone:req.body.phone,  
            password:securePassword,
            location:req.body.location
        }).then (res.status(201).json({success:true}))
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})

router.post('/login', 
[
    body('email','fiedl email').isEmail(),
    body('password','field password').isLength({min:8}),]
,async ( req , res )=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const { email,password } = req.body
    try{
        const userData = await User.findOne({ email })
        if( !userData ){
            return res.status(400).json({errors: 'try login correct credantials'})
        }

        const comPassword = await bcrypt.compare(password, userData.password)

        if(!comPassword){
            return res.status(400).json({errors: 'try login correct credantials'})
        }
        const token = jsonwebtoken.sign({user:userData._id},secretKey)
        return res.status(200).json({success:true,authToken:token})
    }
    catch(error){
        console.log(error)
        res.json({success:false})
    }
})

router.post('/orderData',async (req,res)=>{
    let data= req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    let existEmail = await userOrder.findOne({email:req.body.email})
    if(existEmail === null){
        try{
            await OrderShema.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.status(200).json({success:true})
            })
        }catch(error){
            console.log(error)
        }
    }
    else{
        try{
            await OrderShema.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        }catch(error){
            console.log(error)
        }
    }
})
router.post('/myorder', async (req,res)=>{
    try{
        const myOrder = await OrderShema.findOne({email:req.body.email})
        res.json({orderData:myOrder})
    }catch(error){
        console.log(error)
    }
})

module.exports = router