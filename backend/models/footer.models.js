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
      },

      hours: {
        type: String,
      },
    },
  ],
  socialMedia: {
    facebook: {
      url: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
    twitter: {
      url: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
    instagram: {
      url: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
    linkedin: {
      url: {
        type: String,
      },
      icon: {
        type: String,
      },
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
