const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
require('../db/conn')
const User = require('../model/userSchema')
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');


router.get('/',function(req,res){
    res.send('This is Router in Home page')
})

// signup declaration
router.post('/register',function(req,res){
    const {name ,email, phone, work, password, cpassword} = req.body;
    // console.log(req.body)
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'Please Field All Property'})
    }
    
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:'User Already here'})
        }else if(password != cpassword){
            return res.status(422).json({error:'Your Both Password Are Not Same'})

        }else{
            const user = new User({name,email, phone, work, password, cpassword })
            user.save(function(error){
            
                if(error){
                    return res.status(500).json({error:'User Registerd Failed'})
                    
                }else{
                    return res.status(201).json({message:'User Registerd Done'})
    
                }
            })
        }
        


        
        
    }).catch(error =>{console.log(error)})

})

//login declaration 
router.post('/signin', async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({error: 'Please Field All Value'})
        }
        const UserLogIn = await User.findOne({email:email})
        
        if(UserLogIn){
            const matchPassword = await bcrypt.compare(password, UserLogIn.password)
            const token = await UserLogIn.genrateAuthToken();
            res.cookie("token",token, {
                expires: new Date(Date.now() + 25892000000 ),
                httpOnly:true
            })

            if(!matchPassword){
                res.status(401).json({error:'User Not Matched'})
            }else{
                res.json({message:"Sign In Successfully"})
            }
        }else{
            res.status(401).json({error:'User Not Matched'})
        }
    }catch(error){
        console.log(error)
    }


})

router.get('/about',authenticate, (req,res)=>{
    res.send(req.rootUser)
})

// get data for home and contact  
router.get('/getData',authenticate, (req,res)=>{
    res.send(req.rootUser)
})


router.post('/contact', async function(req,res){
    try{
        const { name, email ,phone, message } = req.body

        if(!name || !email || !phone || !message){
           return res.status(422).json({error:'Please Field All Data'})
        }
        const userData = await User.findOne({ name:name, email:email, phone:phone ,})
        // console.log(userData)
        if(userData){
           const userMessage = await userData.addMessage( name, email , phone, message )

           await userData.save()

           res.status(201).json({message:"Contact Successfull"})
        }

    }
    catch(error){
        console.log(error)
    }
})
router.get('/logout', (req,res)=>{
    res.clearCookie('token')
    res.status(200).send("User Logout")
})

module.exports = router
