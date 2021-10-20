const mongoose  = require('mongoose')

const adminSchema = new mongoose.Schema({
    password:{type:String}
})

module.exports = mongoose.model('adminUser', adminSchema)