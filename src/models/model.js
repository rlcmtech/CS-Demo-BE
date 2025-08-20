import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  middlename: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["production", "management", "admin", "executive"],
    default: "production"
  },
  access: {
    type: String,
    enum: ["unclassified", "confidential", "secret", "topsecret"],
    default: "unclassified"
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true }); // This automatically creates createdAt and updatedAt fields

// Optional: hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Optional: method to compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;