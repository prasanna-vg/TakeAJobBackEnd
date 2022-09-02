const mongoose = require('mongoose');

const tableDataSchema = new mongoose.Schema({
    companyDrive: {type:String},
    companyName: {type:String},
    companyLogo: {type:String},
    companyCategory: {type:String},
    role: {type:String},
    jobLocation: {type:String},
    salary: {type:String},
    interviewLocation: {type:String},
    lastDate: {type:String},
    degree: {type:String},
    batch: {type:String},
    experience: {type:String},
    applyLink: {type:String},
    foundLink: {type:String},
    postedDate: {type:String,required:true},
    description:[{heading:{type:String},para:{type:String}}],
    keywords:[{type:String}]
}) 

const TableData = module.exports = mongoose.model('TableList', tableDataSchema);