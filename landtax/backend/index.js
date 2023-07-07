const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
const jsonwebtoken = require('jsonwebtoken')



// for sql
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'landtaxbd'
})

//user Registration
app.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body.user
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please Field All Property' })
    }
    const emailSql = "SELECT * FROM users WHERE email = ?";
    db.query(emailSql, [email], async (err, results) => {
        if (err) {
            return res.status(400).json({ error: 'data register failed' })
        }
        else if (results.length > 0) {
            return res.status(400).json({ message: 'user Exist' })
        }
        else {
            const sql = "INSERT INTO `users`(`name`, `email`, `phone`, `password`) VALUES (?)";
            const values = [name, email, phone, password]
            db.query(sql, [values], (err) => {
                if (err) {
                    return res.status(400).json({ error: 'data register failed' })
                }
                return res.status(201).json({ message: 'user Registerd' })
            })
        }
    })


})

// user Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body.user
    if (!email || !password) {
        return res.status(400).json({ error: 'Please Field All Property' })
    }
    const sql = "SELECT * FROM users WHERE email = ? AND password = ? "
    db.query(sql, [email, password], (err, results) => {
        if (err || results.length > 1) {
            return res.status(404).json({ error: 'Login Faild' })
        }
        if (results.length === 1) {
            const token = jsonwebtoken.sign({ id: results[0].id }, 'THISISLANDTAXBDIN2023HERE');
            res.cookie('landtaxbd', token)
            return res.status(200).json({ message: 'Login Success', landtaxbdtoken: token })
        }
        else {
            return res.status(400).json({ error: 'Login Faild' })
        }
    })
})

//tax submission
app.post('/taxsubmit', async (req, res) => {
    const serialNo = Math.floor(Math.random() * 8759999)
    const { city_council_union, mouza_jlNo, upazila_policeStation, district, ownerName, holdingNo, landType, khatianNo, dagNo, land_quantity, threeYearsUpDue, lastThreeYearsDue, dueExtraCharge, settledDemmand, totalDemmand, totalCollection, totalCollectionText, totalDue, comments, todayDateBangla, todayDateEng } = req.body.memo
    const serialSql = "SELECT * FROM `paidtaxmemo` WHERE serialNo = ?";
    db.query(serialSql, [serialNo], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Tax Submit Failed' })
        }
        else if (result.length > 0) {
            return res.status(400).json({ error: 'Tax Submit Failed' })
        }
        else {
            const sql = "INSERT INTO `paidtaxmemo`(`serialNo`, `city_council_union`, `mouza_jlNo`, `upazila_policeStation`, `district`, `ownerName`, `holdingNo`, `landType`, `khatianNo`, `dagNo`, `land_quantity`, `threeYearsUpDue`, `lastThreeYearsDue`, `dueExtraCharge`, `settledDemmand`, `totalDemmand`, `totalCollection`, `totalCollectionText`, `totalDue`, `comments`, `todayDateBangla`, `todayDateEng`) VALUES (?)"
            const values = [serialNo, city_council_union?city_council_union:0, mouza_jlNo?mouza_jlNo:0, upazila_policeStation?upazila_policeStation:0, district?district:0, ownerName?ownerName:0, holdingNo?holdingNo:0, landType?landType:0, khatianNo?khatianNo:0, dagNo?dagNo:0, land_quantity?land_quantity:0, threeYearsUpDue?threeYearsUpDue:0, lastThreeYearsDue?lastThreeYearsDue:0, dueExtraCharge?dueExtraCharge:0, settledDemmand?settledDemmand:0, totalDemmand?totalDemmand:0, totalCollection?totalCollection:0, totalCollectionText?totalCollectionText:0, totalDue?totalDue:0, comments?comments:"yes/no", todayDateBangla?todayDateBangla:0, todayDateEng?todayDateEng: new Date]

            db.query(sql, [values], (err, results) => {
                if (err) {
                    return res.status(404).json({ error: 'Tax Submit Failed' })
                }
                db.query("SELECT * FROM `paidtaxmemo` WHERE serialNo = ?", [serialNo], (err,data)=>{
                    if(err){
                        return res.status(404).json({ error: 'Tax Submit Failed' })
                    }
                    return res.status(201).json({ message: 'Tax Submit Success',memo:data })
                })
            })
        }
    })

})

//collected tax
app.get('/collectedtax', (req,res)=>{
    const sql = "SELECT * FROM paidtaxmemo"
    db.query(sql, (err, results)=>{
        if(err){
            return res.json({error:'collected data getting failed'})
        }
        return res.status(200).send(results)
    })
})

//log out 
app.get('/logout', (req, res)=>{
    res.clearCookie("landtaxbd")
    res.status(200).json({ message: 'Employee Logout Success' })
})

// get tax serialNo
app.get('/:serialNo', (req,res)=>{
    db.query("SELECT * FROM `paidtaxmemo` WHERE serialNo = ?", [req.params.serialNo], (err,data)=>{
        if(err){
            return res.status(404).json({ error: 'data query failed' })
        }
        res.send(data)
    })
})

// delete by serialNo
app.delete('/delete/:serialNo', (req,res)=>{
    const sql = "DELETE FROM `paidtaxmemo` WHERE serialNo = ? "
    db.query(sql, [req.params.serialNo], (err,result)=>{
        if(err){
            return res.status(400).json({error:'Data Delete Failed'})
        }
        return res.status(200).json({message:'Data Delete Success'})
    })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});