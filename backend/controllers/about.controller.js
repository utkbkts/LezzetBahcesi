import catchAsyncError from "../middleware/catch.middleware.js";
import About from "../models/about.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

const aboutCreate = catchAsyncError(async (req, res) => {
  const { staticModal, secondsModal, chefs1, mission, whoChoose } = req.body;

  const staticImages = await Promise.all(
    staticModal?.staticImages?.map((item) =>
      upload_file(item.url, "shopit/about")
    )
  );
  const secondsImage = await upload_file(
    secondsModal?.secondsImage?.url,
    "shopit/about"
  );
  const chefs1Image = await upload_file(chefs1?.imageChef?.url, "shopit/about");

  const aboutFind = await About.findOne().lean();

  if (aboutFind) {
    const updatedAbout = await About.findByIdAndUpdate(
      aboutFind._id,
      {
        staticModal: {
          titleStatic: staticModal.titleStatic,
          descriptionStatic: staticModal.descriptionStatic,
          experience: staticModal.experience,
          customers: staticModal.customers,
          dishes: staticModal.dishes,
          staticImages: staticImages,
        },
        secondsModal: {
          secondsImage: secondsImage,
          header: secondsModal.header,
          content: secondsModal.content,
          paragraph: secondsModal.paragraph,
        },
        chefs1: {
          imageChef: chefs1Image,
          header: chefs1.header,
          title: chefs1.title,
          content: chefs1.content,
          paragraph: chefs1.paragraph,
        },
        mission: {
          header: mission.header,
          paragraph: mission.paragraph,
        },
        whoChoose: {
          header: mission.header,
          paragraph: mission.paragraph,
        },
      },
      { new: true }
    );

    return res.status(200).json({ success: true, about: updatedAbout });
  } else {
    const newAbout = await About.create({
      staticModal: {
        titleStatic: staticModal.titleStatic,
        descriptionStatic: staticModal.descriptionStatic,
        experience: staticModal.experience,
        customers: staticModal.customers,
        dishes: staticModal.dishes,
        staticImages: staticImages,
      },
      secondsModal: {
        secondsImage: secondsImage,
        header: secondsModal.header,
        content: secondsModal.content,
        paragraph: secondsModal.paragraph,
      },
      chefs1: {
        imageChef: chefs1Image,
        header: chefs1.header,
        title: chefs1.title,
        content: chefs1.content,
        paragraph: chefs1.paragraph,
      },
      mission: {
        header: mission.header,
        paragraph: mission.paragraph,
      },
      whoChoose: {
        header: whoChoose.header,
        paragraph: whoChoose.paragraph,
      },
    });

    return res.status(201).json({ success: true, about: newAbout });
  }
});

const aboutGet = catchAsyncError(async (req, res) => {
  const about = await About.findOne().lean();
  return res.status(200).json({ about });
});
const aboutDelete = catchAsyncError(async (req, res, next) => {
  let about = await About.findOne().lean();
  if (!about) {
    return next(new ErrorHandler("about not found", 404));
  }

  const imageIdToDelete = req.params.id;

  const imageIndex = about.staticModal.staticImages.findIndex(
    (img) => img._id.toString() === imageIdToDelete
  );

  if (imageIndex === -1) {
    return next(new ErrorHandler("Image not found", 404));
  }
  await delete_file(about.staticModal.staticImages[imageIndex].public_id);

  about.staticModal.staticImages.splice(imageIndex, 1);

  await About.findByIdAndUpdate(about._id, about, { new: true });

  res.status(200).json({
    message: "About image deleted successfully",
  });
});

export default { aboutCreate, aboutGet, aboutDelete };
