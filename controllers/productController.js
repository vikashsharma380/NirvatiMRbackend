const Product=require("../models/Product");

// Create
exports.createProduct=async(req,res)=>{

try{

const product=await Product.create(req.body);

res.status(201).json({

success:true,

message:"Product Added Successfully",

data:product

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};

// Get All

exports.getProducts=async(req,res)=>{

try{

const products=await Product.find({

status:true

}).sort({

name:1

});

res.json({

success:true,

count:products.length,

data:products

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};

// Get One

exports.getProduct=async(req,res)=>{

try{

const product=await Product.findById(req.params.id);

res.json({

success:true,

data:product

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};

// Update

exports.updateProduct=async(req,res)=>{

try{

const product=await Product.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true

}

);

res.json({

success:true,

message:"Updated",

data:product

});

}catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};

// Delete

exports.deleteProduct=async(req,res)=>{

try{

await Product.findByIdAndUpdate(

req.params.id,

{

status:false

}

);

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

};