const mongoose = require('mongoose')
const db = 'mongodb+srv://adminsometi:sometiapp@cluster.96pyoqg.mongodb.net/someti?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(db,(error)=>{
    if(error) console.log(error, 'database was failed')
    else console.log('Database was connected') 
})