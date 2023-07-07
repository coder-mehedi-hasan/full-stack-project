const mongoose = require('mongoose')

const dataBase = process.env.DATABASE

mongoose.connect(dataBase,{
    useUnifiedTopology: true ,
    useNewUrlParser: true,
    useFindAndModify:false
},function(error){
    if(error){
        console.log('Database are Loaded Unsuccessful')
    }else{
        console.log('Database are Loaded Successfully')
    }
})