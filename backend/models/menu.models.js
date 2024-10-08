import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  sectionOne: [
    {
      images: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
  sectionTwo: [
    {
      images: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
  sectionThree: [
    {
      images: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
  sectionFour: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  sectionFive: [
    {
      images: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
  ],
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
