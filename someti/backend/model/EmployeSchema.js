const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')
const { Schema } = mongoose
const secretKey = 'jsonwebtokenforemployevalidation'
const Employee = new Schema({
    name: {
        type: String,
        required: true
    },
    nidNo: {
        type: Number,
        required: true
    },
    fathersName: {
        type: String,
    },
    mothersName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
    },
    religion: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    address: [
        {
            presentAddress: {
                type: String,
            },
            parmanentAddress: {
                type: String,
            }
        },
    ]
    ,
    educationInfo: [
        {
            examName: {
                type: String,
            },
            examYear: {
                type: Number,
            },
            examResult: {
                type: Number,
            },
        }
    ],
    references: [

        {
            referencesName: {
                type: String,
            },
            referencesPhone: {
                type: Number,
            },
            referencesDesignation: {
                type: String,
            },
            referencesRelation: {
                type: String,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

Employee.methods.genarateAuthToken = async function(){
    try{
        let tokenUser = jsonwebtoken.sign({_id:this._id},secretKey)
        this.tokens = this.tokens.concat({token:tokenUser})
        await this.save()
        return tokenUser
    }catch(error){
        console.log(error)
    }
}


module.exports = mongoose.model('employee', Employee)