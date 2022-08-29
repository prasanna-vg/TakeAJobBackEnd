const mongoose = require('mongoose');

const tableDataSchema = new mongoose.Schema({
    companyDrive: {type:String,required:true},
    companyName: {type:String,required:true},
    companyLogo: {type:String,required:true},
    companyCategory: {type:String,required:true},
    role: {type:String,required:true},
    jobLocation: {type:String,required:true},
    salary: {type:String,required:true},
    interviewLocation: {type:String,required:true},
    lastDate: {type:String,required:true},
    degree: {type:String,required:true},
    batch: {type:String,required:true},
    experience: {type:String,required:true},
    applyLink: {type:String,required:true},
    postedDate: {type:String,required:true},
    description:[{heading:{type:String,required:true},para:{type:String, required:true}}],
    keywords:[{type:String}]
})

const TableData = module.exports = mongoose.model('TableList', tableDataSchema);