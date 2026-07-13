const Visit=require("../models/Visit");

exports.createVisit=async(req,res)=>{

try{

const visit=await Visit.create(req.body);

res.status(201).json({

success:true,

message:"Visit Saved",

data:visit

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};

exports.getVisits=async(req,res)=>{

try{

const visits=await Visit.find()

.populate("party")

.populate("order.product")

.populate("sample.product")

.populate("detailing");

res.json({

success:true,

count:visits.length,

data:visits

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};