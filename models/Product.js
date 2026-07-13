const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productCode:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "Tablet",
            "Capsule",
            "Syrup",
            "Injection",
            "Ayurvedic",
            "Powder",
            "Drops",
            "Cream",
            "Other"
        ],
        default:"Tablet"
    },

    company:{
        type:String,
        default:"Nirvati Herbal"
    },

    description:{
        type:String,
        default:""
    },

    mrp:{
        type:Number,
        required:true
    },

    ptr:{
        type:Number,
        default:0
    },

    pts:{
        type:Number,
        default:0
    },

    gst:{
        type:Number,
        default:0
    },

    stock:{
        type:Number,
        default:0
    },

    unit:{
        type:String,
        default:"Box"
    },

    image:{
        type:String,
        default:""
    },

    status:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Product",productSchema);