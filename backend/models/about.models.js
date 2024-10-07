import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  //section1
  header: {
    type: String,
  },
  content: {
    type: String,
  },
  experience: {
    type: String,
  },
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
  //section2
  headerSection: {
    type: String,
  },
  contentSection: {
    type: String,
  },
  experienceSection: {
    type: String,
  },

  //section3
  headerChef: {
    type: String,
  },
  contentChef: {
    type: String,
  },
  titleChef1: {
    type: String,
  },
  descriptionChef1: {
    type: String,
  },

  titleChef2: {
    type: String,
  },
  descriptionChef2: {
    type: String,
  },

  //section4
  headerMission: {
    type: String,
  },
  descriptionMission: {
    type: String,
  },
  //section5
  whyChoseHeader: {
    type: String,
  },
  whyChoseDescription: {
    type: String,
  },
});

const About = mongoose.model("About", aboutSchema);
export default About;
