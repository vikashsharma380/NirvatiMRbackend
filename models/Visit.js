const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  productName: String,

  qty: {
    type: Number,
    default: 1,
  },

  unit: String,

  mrp: Number,

  rate: {
    type: Number,
    default: 0,
  },

  amount: {
    type: Number,
    default: 0,
  },
});

const visitSchema=new mongoose.Schema({

    mr:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
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

   activities: [{
    type: String,
    enum: [
        "order",
        "sample",
        "detailing",
        "payment",
        "followup",
        "complaint"
    ]
}],

    order:[orderItemSchema],

    sample:[orderItemSchema],

    detailing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
totalAmount: {
    type: Number,
    default: 0
},
complaint: {

type: {
type: String,
default: "",
},

title: {
type: String,
default: "",
},

description: {
type: String,
default: "",
},

priority: {
type: String,
enum: ["Low","Medium","High"],
default: "Medium",
}

},
    remarks:{
        type:String,
        default:""
    },

    deliveryDate:Date,
payment: {
  amount: {
    type: Number,
    default: 0,
  },

  mode: {
    type: String,
    enum: ["Cash", "UPI", "Cheque", "NEFT", "RTGS"],
    default: "Cash",
  },

  reference: {
    type: String,
    default: "",
  },
},

followUp: {
  nextDate: Date,

  purpose: {
    type: String,
    default: "",
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
},

complaint: {
  title: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["Open", "Resolved"],
    default: "Open",
  },
},
   location: {
    latitude: Number,
    longitude: Number,
    address: String,
},

    visitPhoto:String,

    selfie:String,

    checkIn: {
  type: Date,
  default: Date.now,
},

    checkOut: {
  type: Date,
},

    duration: {
    type: Number,
    default: 0
},

    status: {
    type: String,
    enum: [
        "Started",
        "Completed",
        "Cancelled"
    ],
    default: "Started"
},

},{
    timestamps:true
});

module.exports=mongoose.model("Visit",visitSchema);