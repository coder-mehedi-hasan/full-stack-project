const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
require('./conn/conn')
app.use(cookieParser())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers',
    'Origin , X-Requested-With , Content-Type'
    )

    next()
})

app.use(express.json())
app.use(require('./Router/auth'))
app.get('/',(req,res)=>{
    res.send('Hi Im Express')
})
app.listen(5000,()=>{
    console.log('Server Run Success')
})