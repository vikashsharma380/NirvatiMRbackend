const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: "",
    },
photo: {
  type: String,
  default: "",
},
deviceToken: {
  type: String,
  default: "",
},

deviceType: {
  type: String,
  enum: ["android", "ios"],
  default: "android",
},
    password: {
      type: String,
      required: true,
    },
lastLogin: Date,
    role: {
      type: String,
      enum: ["admin", "manager", "mr"],
      default: "mr",
    },

    headquarters: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt Password
// Encrypt Password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);