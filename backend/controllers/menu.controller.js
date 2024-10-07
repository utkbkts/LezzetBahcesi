import catchAsyncError from "../middleware/catch.middleware.js";
import Menu from "../models/menu.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
const menuCreate = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const menuFind = await Menu.findOne().lean();

  for (let i = 0; i < menuFind.images.length; i++) {
    await delete_file(menuFind.images[i].public_id);
  }
  const uploadPromises = req.body.images.map(async (image) => {
    const result = await upload_file(image.url, "shopit/menu");

    return {
      public_id: result.public_id,
      url: result.url,
    };
  });

  const urls = await Promise.all(uploadPromises);

  if (menuFind) {
    const updated = await Menu.findByIdAndUpdate(
      menuFind._id,
      {
        ...req.body,
        images: urls,
      },
      { new: true }
    );

    return res.status(200).json({ menu: updated });
  } else {
    const menu = await Menu.create({
      ...req.body,
      images: urls,
      user: req.user._id,
    });

    return res.status(201).json({ menu });
  }
});

export default { menuCreate };
