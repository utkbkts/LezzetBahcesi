import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    FeaturesModal: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
    ],
    staticModal: [
      {
        images: [
          {
            public_id: { type: String },
            url: { type: String },
          },
        ],
        description: { type: String },
        title: { type: String },
        experience: {
          years: { type: Number },
          description: { type: String },
        },
        customers: {
          count: { type: String },
          description: { type: String },
        },
        dishes: {
          count: { type: String },
          description: { type: String },
        },
      },
    ],
    introduction: [
      {
        title: { type: String },
        description: { type: String },
        content: { type: String },
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
    chefs: [
      {
        title: { type: String },
        description: { type: String },
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
    mission: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const About = mongoose.model("About", aboutSchema);
export default About;
