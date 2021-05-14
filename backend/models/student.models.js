const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    fullName:{
        type: String,
        require :true,
        trim: true
    },
    email:{
        type: String,
        require :true,
        trim: true
    }

},{
    timestamps:true
});

const Student = mongoose.model('pn_students', StudentSchema);

module.exports = Student;