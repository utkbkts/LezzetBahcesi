import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  contact: {
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  workingHours: [
    {
      day: {
        type: String,
        required: true,
      },
      hours: {
        type: String,
        required: true,
      },
    },
  ],
  socialMedia: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;
