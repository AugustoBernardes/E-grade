const mongoose = require('mongoose')

const firstBimesterSchema = new mongoose.Schema({
    studentId:{type:String},
    Portuguese:{type:Number,default:00},
    PE:{type:Number,default:00},
    English:{type:Number,default:00},
    Spanish:{type:Number,default:00},
    Physic:{type:Number,default:00},
    Chemistry:{type:Number,default:00},
    Biology:{type:Number,default:00},
    History:{type:Number,default:00},
    Geography:{type:Number,default:00},
    Philosophy:{type:Number,default:00},
    Sociology:{type:Number,default:00},
    type:{type:String,default:'first'}
})

module.exports = mongoose.model('FirstBimester', firstBimesterSchema)