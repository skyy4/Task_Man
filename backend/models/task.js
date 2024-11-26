const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    important: {
        type: Boolean,
        default:false,
    },
    complete: {
        type: Boolean,
        default:false,
    },
    deadline: {
        type: Date,
        default: null
    },
    reminder: {
        type: Date,
        default: null
    }
},{timestamps:true})

module.exports = mongoose.model('task', TaskSchema)