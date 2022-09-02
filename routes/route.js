var express = require('express');
var route = express.Router();
var TableData = require('../models/tableData');
var keyword_extractor = require('keyword-extractor');
route.get('/datas',(req,res,next)=>{
    TableData.find((err, tableData)=>{
        res.json(tableData);
    })
});
route.get('/datas/:_id', function(req,res){
    TableData.findById(req.params._id, function(err, tableData){
       if(err) throw err;
       else return res.json(tableData);
    });
 });
route.get('/datas/cat/:category', function(req,res){
    TableData.find({companyCategory:req.params.category}, function(err, tableData){
       if(err) throw err;
       else return res.json(tableData);
    });
 });
route.post('/data',(req,res,next)=>{
    var keywordArray = [];
    var datetime = new Date();
    let postedDate = datetime.toISOString().slice(0,10);
    let newTableData = TableData({
        companyDrive: req.body.companyDrive,
        companyName: req.body.companyName,
        companyLogo: req.body.companyLogo,
        companyCategory: req.body.companyCategory,
        role: req.body.role,
        jobLocation: req.body.jobLocation,
        salary: req.body.salary,
        interviewLocation: req.body.interviewLocation,
        lastDate: req.body.lastDate,
        degree: req.body.degree,
        batch: req.body.batch,
        experience: req.body.experience,
        applyLink: req.body.applyLink,
        foundLink: req.body.foundLink,
        postedDate: postedDate,
        description:req.body.description,
    });
    newTableData.description.forEach(element => {
        const extratedData = keyword_extractor.extract(element.para,{
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
        });
        keywordArray.push(extratedData);
    });
    keywordArray = [].concat.apply([], keywordArray);
    var arr = [
        newTableData.companyCategory,
        newTableData.companyName,   
        newTableData.role,
        newTableData.experience,
        newTableData.salary,
        newTableData.jobLocation,
        newTableData.interviewLocation,
        newTableData.degree,
        newTableData.batch,
    ];
    
    keywordArray = keywordArray.concat(arr);
    newTableData.keywords=keywordArray;
    newTableData.save((err, tableData)=>{
        if(err){
            res.json({msg:'Could not add name'});
            console.log(err);
        }else{
            res.json({msg:'Added data successfully!'});
        }
    })
});
route.put('/data/:_id',async(req,res,next)=>{
    
    var keywordArray = [];
    var datetime = new Date();
    const {_id} = req.params;
    const {companyDrive}= req.body;
    const {companyName}= req.body;
    const {companyLogo}=  req.body;
    const {companyCategory}= req.body;
    const {role}= req.body;
    const {jobLocation}= req.body;
    const {salary}= req.body;
    const {interviewLocation}= req.body;
    const {lastDate}= req.body;
    const {degree}= req.body;
    const {batch}= req.body;
    const {experience}= req.body;
    const {applyLink}= req.body;
    const {foundLink}= req.body;
    const postedDate= datetime.toISOString().slice(0,10);
    const {description}= req.body;
    
    description.forEach(element => {
        const extratedData = keyword_extractor.extract(element.para,{
            language:"english",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
        });
        keywordArray.push(extratedData);
    });
    keywordArray = [].concat.apply([], keywordArray);
    var arr = [
        companyCategory,
        companyName,   
        role,
        experience,
        salary,
        jobLocation,
        interviewLocation,
        degree,
        batch,
    ];
    keywordArray = keywordArray.concat(arr);
    const keywords=keywordArray;
    const newTableData = {
        companyDrive, companyName, companyLogo, companyCategory, role, jobLocation, salary, interviewLocation, lastDate, degree, batch, experience, applyLink, foundLink, postedDate, description, keywords
    };
    TableData.findByIdAndUpdate(_id, newTableData,
        (err,updateTable) =>{
            if(err){
            res.json({
                newTableData,
                success: false,
                msg: 'Failed To upload data'
            })
        }else{
            res.json({newTableData,success:true, msg:"Table Data updated"});
        }     
        })
})
route.delete('/data/:_id',(req,res,next)=>{
    TableData.deleteOne({_id:req.params._id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})
module.exports = route;