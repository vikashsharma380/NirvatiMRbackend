const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },

    qty:{
        type:Number,
        default:1
    }

});

module.exports = sampleSchema;