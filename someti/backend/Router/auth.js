const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const Member = require('../model/MemberSchema')
const Employe = require('../model/EmployeSchema')
const secretKey = 'jsonwebtokenforemployevalidation'
const Authenticate = require('../middleware/authenticate')
const WaitedPostData = require('../model/WaitedPostData')


//create **** employee 
router.post('/createemployee', async (req, res) => {
    const { name, phone, email, password, nidNo, dateOfBirth, designation } = req.body.employee
    if (!name || !nidNo || !dateOfBirth || !phone || !email || !password || !designation) {
        return res.status(422).json({ error: 'Please Field All Property' })
    }
    const employeExistNid = await Employe.findOne({ nidNo: nidNo })
    const employeExistEmail = await Employe.findOne({ email: email })
    if (employeExistEmail || employeExistNid) {
        return res.status(422).json({ error: 'Property Info Is Exist' })
    }
    else {
        if ((new Date().getFullYear()) - (dateOfBirth.split("-")[0]) < 18) {
            return res.status(422).json({ error: 'Your Are Child' })
        }
        const secpassword = await bcrypt.hash(password, 12)
        const employee = new Employe({ name, phone, email, password: secpassword, nidNo, dateOfBirth, designation })
        employee.save((error) => {
            if (error) {
                console.log(error)
                return res.status(401).json({ error: 'Employe Registerd Failed' })
            } else {
                return res.status(201).json({ error: 'Employe Registerd Done' })
            }
        })
    }

})


//employee  ****  login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({ error: 'Please Field All Data' })
    }
    try {
        const employee = await Employe.findOne({ email: email })
        if (!employee) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const compPassword = await bcrypt.compare(password, employee.password)
        if (!compPassword) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }

        // const token = await jsonwebtoken.sign({_id:employee._id},secretKey)
        // employee.tokens = employee.tokens.concat({token:token})
        // await employee.save()
        // const dekhi = await employee.tokens
        // res.cookie()
        const token = await employee.genarateAuthToken()
        res.cookie('sometiToken', token, {
            httpOnly: true,

        })
        // res.cookie()
        return res.status(200).json({ message: 'Login Success' })
    } catch (error) {
        res.status(401).json({ error: 'Login Failed' })
        console.log(error)
    }
})

//employee  **** logout
router.get('/logout', (req, res) => {
    res.clearCookie("sometiToken")
    res.status(200).json({ message: 'Employee Logout Success' })
})


//register **** member *** page
router.get('/registermemberpage', Authenticate, function (req, res) {
    const rootUser = req.rootUser
    res.send(rootUser)
    res.status(200)
})

//create  **** members
router.post('/createmember', Authenticate, async (req, res) => {
    const { refName, refId, name, fatherName, motherName, nidOrBirth, phone, serialNo } = req.body.memberInfo
    try {
        if (!name || !nidOrBirth || !phone || !serialNo || !refName || !refId) {
            return res.status(401).json({ error: 'Please Fied All Data' })
        }
        const memberExistnid = await Member.findOne({ nid_birth_No: nidOrBirth })
        const memberExistserial = await Member.findOne({ serialNo: serialNo })
        if (memberExistnid || memberExistserial) {
            return res.status(401).json({ error: 'Member Already here' })
        }
        else {
            const member = new Member({ name, fatherName, motherName, nidOrBirth, phone, serialNo, creatorInfo: [{ id: refId }, { refName: refName }] })
            member.save((error) => {
                if (error) {
                    console.log(error)
                    return res.status(422).json({ error: 'Member Registerd Failed' })
                } else {
                    return res.status(201).json({ error: 'Member Registerd Done' })
                }
            })
        }

    } catch (error) {
        res.status(404).json({ error: 'member Not Create' })
        console.log(error)
    }
})


//provide members
router.get('/allmembers', Authenticate, async (req, res) => {
    const allMembers = mongoose.connection.db.collection('members')
    allMembers.find({}).toArray((error, allMembers) => {
        if (error) console.log(error)
        else res.send(allMembers)
    })
})

//
router.get('/getwaiting',Authenticate ,async (req, res) => {
    const allwitedData = mongoose.connection.db.collection('waitedpostdatas')
    allwitedData.find({}).toArray((error, allwitedData) => {
        if (error) console.log(error)
        else res.send(allwitedData)

    })
})
// single members data
router.get('/:id', Authenticate, async (req, res) => {
    const memberIn = await Member.findOne({ _id: req.params.id })
    if (memberIn) {
        res.send(memberIn)
    }
});


//posting data
router.post('/allDayPosting', Authenticate, async (req, res) => {
    const data = req.body.postData
    try {
        const memberIn = await Member.findOne({ _id: data.idNo })
        if (!memberIn) {
            return res.status(404).json({ error: 'member not match' })
        } else {
            const { idNo, serialNo, transactionCetagory, date, depositeSaving, withdrawSavings, increamentSaving, totalSaving, depositeLoan, loanReceiving, loanReceivingWithIncreament, loanDue } = data
            memberIn.accountDetails = memberIn.accountDetails.concat({ date: date, transactionCetagory: transactionCetagory, transection: [{ depositeSaving, withdrawSavings, increamentSaving, totalSaving, depositeLoan, loanReceiving, loanReceivingWithIncreament, loanDue }] })
            await memberIn.save()
            return res.status(200).json({ message: 'Data Posting Success' })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'post data failed' })
    }

})

router.post('/postingdata', Authenticate, async (req, res) => {
    try {
        const info = req.body.postData
        const { name, idNo, serialNo, transactionCetagory, date, depositeSaving, withdrawSavings, increamentSaving, depositeLoan, loanReceiving, loanReceivingWithIncreament, totalSaving, dueLoan } = info
        if (!idNo || !serialNo || !transactionCetagory || !date) {
            return res.status(401).json({ error: 'Please Feild All Data' })
        }
        const postWaitedData = new WaitedPostData({ name, idNo, serialNo, date, transactionCetagory, transection: [{ depositeSaving, withdrawSavings, increamentSaving, depositeLoan, loanReceiving, loanReceivingWithIncreament, totalSaving: (parseInt(depositeSaving) + totalSaving - withdrawSavings), dueLoan: (loanReceivingWithIncreament + dueLoan) - parseInt(depositeLoan) }] })
        postWaitedData.save((err) => {
            if (err) {
                console.log(err)
                return res.status(422).json({ error: 'Posted Failed' })
            } else {
                return res.status(200).json({ message: 'Posted Done' })
            }
        })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router