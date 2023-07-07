const mongoose = require('mongoose')
const { Schema } = mongoose
const Member = new Schema({
    serialNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    nidOrBirth: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    creatorInfo: [
    ],
    accountDetails: [
        {

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
                    totalSaving: {
                        type: Number
                    },
                    dueLoan: {
                        type: Number
                    }

                }
            ]

        }
    ]


})

module.exports = mongoose.model('members', Member)