const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({

    type:{
        type:String,
        enum:["doctor","chemist","retailer","hospital"],
        required:true
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    qualification:{
        type:String,
        default:""
    },

    speciality:{
        type:String,
        default:""
    },

    mobile:{
        type:String,
        default:""
    },

    email:{
        type:String,
        default:""
    },

    address:{
        type:String,
        default:""
    },

    city:{
        type:String,
        default:""
    },

    state:{
        type:String,
        default:""
    },

    pincode:{
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

module.exports = mongoose.model("Party",partySchema);