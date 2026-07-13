const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    quantity:{
        type:Number,
        default:1
    },

    rate:{
        type:Number,
        default:0
    }

});

const visitSchema=new mongoose.Schema({

    mr:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    party:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Party",
        required:true
    },

    visitType:{
        type:String,
        enum:["doctor","chemist","retailer","hospital"],
        required:true
    },

    activities:[{
        type:String
    }],

    order:[orderItemSchema],

    sample:[orderItemSchema],

    detailing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],

    remarks:{
        type:String,
        default:""
    },

    deliveryDate:Date,

    latitude:Number,

    longitude:Number,

    address:String,

    visitPhoto:String,

    selfie:String,

    checkIn:Date,

    checkOut:Date,

    duration:Number,

    status:{
        type:String,
        enum:["Pending","Completed"],
        default:"Pending"
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Visit",visitSchema);