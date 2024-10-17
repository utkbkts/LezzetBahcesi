import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  titleOne: {
    type: String,
  },
  contentOne: [
    {
      contentTitle: {
        type: String,
      },
      contentDesc: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
  titleTwo: {
    type: String,
  },
  contentTwo: [
    {
      contentTitle: {
        type: String,
      },
      contentDesc: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
  titleThree: {
    type: String,
  },
  contentThree: [
    {
      contentTitle: {
        type: String,
      },
      contentDesc: {
        type: String,
      },
      price: {
        type: String,
      },
    },
  ],
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
