const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

console.log("USER MODEL LOADED");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

// 🔐 Password hash before save (NO next, NO arrow fn)
userSchema.pre("save", async function () {
  // agar password change nahi hua to dobara hash mat karo
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
