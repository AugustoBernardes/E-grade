const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{type:String},
    cpf:{type:Number},
    phone:{type:Number},
    classNumber:{type:Number}
})

module.exports = mongoose.model('Student', studentSchema )