import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    staticModal: {
      titleStatic: {
        type: String,
      },
      descriptionStatic: {
        type: String,
      },
      titleStatic: {
        type: String,
      },
      experience: {
        years: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      customers: {
        count: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      dishes: {
        count: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      staticImages: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true }
);
const About = mongoose.model("About", aboutSchema);
export default About;
