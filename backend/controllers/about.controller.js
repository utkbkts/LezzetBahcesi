import catchAsyncError from "../middleware/catch.middleware.js";
import About from "../models/about.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

const aboutCreate = catchAsyncError(async (req, res) => {
  const { staticModal, secondsModal } = req.body;
  console.log("🚀 ~ aboutCreate ~ secondsModal:", secondsModal);

  const staticImages = await Promise.all(
    staticModal?.staticImages?.map((item) =>
      upload_file(item.url, "shopit/about")
    )
  );
  const secondsImage = await upload_file(
    secondsModal?.secondsImage?.url,
    "shopit/about"
  );
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
    });

    return res.status(201).json({ success: true, about: newAbout });
  }
});

const aboutGet = catchAsyncError(async (req, res) => {
  const about = await About.findOne().lean();
  return res.status(200).json({ about });
});

export default { aboutCreate, aboutGet };
