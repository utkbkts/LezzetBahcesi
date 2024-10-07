import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  headerMainOne: {
    type: String,
  },
  contentMainOne: [
    {
      type: String,
    },
  ],
  descriptionMainOne: [
    {
      type: String,
    },
  ],
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  headerSectionTwo: {
    type: String,
  },
  contentSectionTwo: [
    {
      type: String,
    },
  ],
  descriptionSectionTwo: [
    {
      type: String,
    },
  ],
  headerSectionThree: {
    type: String,
  },
  contentSectionThree: [
    {
      type: String,
    },
  ],
  descriptionSectionThree: [
    {
      type: String,
    },
  ],
  //section 4
  headerSectionFour: {
    type: String,
  },
  contentSectionFour: {
    type: String,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
