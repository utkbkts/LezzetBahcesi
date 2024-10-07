import catchAsyncError from "../middleware/catch.middleware.js";
import About from "../models/about.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

const aboutCreate = catchAsyncError(async (req, res) => {
  const { staticModal, introduction, chefs } = req.body;

  const aboutFind = await About.findOne().lean();

  //staticModalImages
  const staticModalData = staticModal[0];
  const staticModalImages = await Promise.all(
    staticModalData.images.map((image) => {
      return upload_file(image.url, "shopit/about");
    })
  );

  // Chef Images
  const chefsModalData = chefs[0];
  const chefImages = await Promise.all(
    chefs.map((chef) => {
      if (chef.images && chef.images.url) {
        return upload_file(chef.images.url, "shopit/about");
      }
      return null;
    })
  );
  //introductionimages
  const introductionImages = await upload_file(
    introduction[0].images.url,
    "shopit/about"
  );

  if (aboutFind) {
    //delete image
    for (let i = 0; i < staticModalData.images.length; i++) {
      await delete_file(staticModalImages[i].public_id);
    }
    for (let i = 0; i < chefsModalData.images.length; i++) {
      await delete_file(chefImages[i].public_id);
    }

    const updated = await About.findByIdAndUpdate(
      aboutFind._id,
      {
        ...req.body,
        staticModal: { ...staticModal, images: staticModalImages },
        introduction: { ...introduction, images: introductionImages },
        chefs: { ...chefs, images: chefImages },
      },
      { new: true }
    );

    return res.status(200).json({ about: updated });
  } else {
    const about = await About.create({
      ...req.body,
      staticModal: { ...staticModal, images: staticModalImages },
      introduction: { ...introduction, images: introductionImages },
      chefs: { ...chefs, images: chefImages },
    });

    return res.status(201).json({ about });
  }
});

export default { aboutCreate };
