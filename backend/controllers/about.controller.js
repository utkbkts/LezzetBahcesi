import catchAsyncError from "../middleware/catch.middleware.js";
import About from "../models/about.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
const aboutCreate = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const aboutFind = await About.findOne().lean();

  for (let i = 0; i < aboutFind.images.length; i++) {
    await delete_file(aboutFind.images[i].public_id);
  }
  const uploadPromises = req.body.images.map(async (image) => {
    const result = await upload_file(image.url, "shopit/about");

    return {
      public_id: result.public_id,
      url: result.url,
    };
  });

  const urls = await Promise.all(uploadPromises);

  if (aboutFind) {
    const updated = await About.findByIdAndUpdate(
      aboutFind._id,
      {
        ...req.body,
        images: urls,
      },
      { new: true }
    );

    return res.status(200).json({ about: updated });
  } else {
    const about = await About.create({
      ...req.body,
      images: urls,
      user: req.user._id,
    });

    return res.status(201).json({ about });
  }
});

export default { aboutCreate };
