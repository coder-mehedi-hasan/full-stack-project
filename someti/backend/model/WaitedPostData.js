const mongoose = require('mongoose')
const { Schema } = mongoose
const WaitedPost = new Schema({
    /*
    name,idNo,serialNo,transactionCetagory,date,transection
    */
    serialNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    idNo: {
        type: String
    },
    date: {
        type: Date
    }, 
    transactionCetagory: {
        type: String
    },
    transection: [
        {
            depositeSaving: {
                type: Number
            },
            withdrawSavings: {
                type: Number
            },
            increamentSaving: {
                type: Number

            },
            depositeLoan: {
                type: Number
            },
            loanReceiving: {
                type: Number
            },
            loanReceivingWithIncreament: {
                type: Number
            },
            totalSaving:{
                type:Number
            },
            dueLoan:{
                type:Number
            }
        }
    ]
})


module.exports = mongoose.model('WaitedPostData', WaitedPost)