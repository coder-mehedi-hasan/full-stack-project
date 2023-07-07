const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000
require('./db/conn')
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin , X-Requested-With , Content-Type, Accept'
    )
    next()
})
app.use(express.json())
app.use(require('./router/Router'))
app.get('/', (req, res) => {
    res.send('hi im express')
})


app.get('/api/foods', (req, res) => {
    const foodData = mongoose.connection.db.collection('foodItem')
    foodData.find({}).toArray((error, foodData) => {
        const foodCategory =mongoose.connection.db.collection('foodCategory')
        foodCategory.find({}).toArray((error,data)=>{
            if (error) console.log(error)
            else res.send([foodData,data])
        })
    })
})

app.listen(port, () => {
    console.log(`${port} server is running`)
})