const User = require("../models/User");

// All MR
exports.getMRs = async (req, res) => {
  try {

    const users = await User.find({
      role: "mr"
    }).sort({ name: 1 });

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};
exports.createMR = async (req,res)=>{

try{

const mr=await User.create({

employeeId:req.body.employeeId,

name:req.body.name,

mobile:req.body.mobile,

email:req.body.email,

password:req.body.password,

headquarters:req.body.headquarters,

role:"mr"

});

res.status(201).json({

success:true,

message:"MR Added",

data:mr

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

}
exports.updateMR = async (req,res)=>{

try{

const mr=await User.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

);

res.json({

success:true,

data:mr

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

}
exports.toggleMR=async(req,res)=>{

try{

const mr=await User.findById(req.params.id);

mr.isActive=!mr.isActive;

await mr.save();

res.json({

success:true,

data:mr

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

}
exports.deleteMR=async(req,res)=>{

try{

await User.findByIdAndDelete(req.params.id);

res.json({

success:true,

message:"Deleted"

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

}