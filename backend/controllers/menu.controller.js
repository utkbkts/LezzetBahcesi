import catchAsyncError from "../middleware/catch.middleware.js";
import Menu from "../models/menu.models.js";

const menuCreate = catchAsyncError(async (req, res, next) => {
  const {
    titleOne,
    contentOne,
    titleTwo,
    contentTwo,
    titleThree,
    contentThree,
  } = req.body;

  const menu = await Menu.findOne({}).lean();

  if (menu) {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menu._id,
      {
        titleOne,
        contentOne,
        titleTwo,
        contentTwo,
        titleThree,
        contentThree,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(updatedMenu);
  } else {
    const newMenu = await Menu.create({
      titleOne,
      contentOne,
      titleTwo,
      contentTwo,
      titleThree,
      contentThree,
    });

    return res.status(201).json(newMenu);
  }
});

const menuGet = catchAsyncError(async (req, res, next) => {
  const menu = await Menu.find({}).lean();

  return res.status(201).json({ menu });
});

export default { menuCreate, menuGet };
