const mongoose = require('mongoose')
const db = 'mongodb+srv://mehedihasan:foodappmern@cluster0.siflwdz.mongodb.net/food-app?retryWrites=true&w=majority'
// const errorHandle = 
mongoose.set("strictQuery", false);    
mongoose.connect(db,(error)=>{
        if(error){
            console.log('Db is connect unsuccessful')
        }else{
            console.log('Db is connect successful')
        }
    })
