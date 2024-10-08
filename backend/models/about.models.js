import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    FeaturesModal: [
      {
        titleFeatures: { type: String },
        descriptionFeatures: { type: String },
        icon: { type: String },
      },
    ],
    staticModal: [
      {
        staticImages: [
          {
            public_id: { type: String },
            url: { type: String },
          },
        ],
        descriptionStatic: { type: String },
        titleStatic: { type: String },
        experience: {
          years: { type: String },
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
        titleIntro: { type: String },
        descriptionIntro: { type: String },
        content: { type: String },
        imagesIntro: {
          public_id: { type: String },
          url: { type: String },
        },
      },
    ],
    chefs: [
      {
        titleChefs: { type: String },
        descriptionChefs: { type: String },
        content: { type: String },
        imagesChefs: {
          public_id: { type: String },
          url: { type: String },
        },
      },
    ],
    mission: {
      titleMission: { type: String },
      descriptionMission: { type: String },
    },
    whoImChoose: {
      titleWhoChoose: { type: String },
      descriptionWhoChoose: { type: String },
    },
  },
  { timestamps: true }
);
const About = mongoose.model("About", aboutSchema);
export default About;
