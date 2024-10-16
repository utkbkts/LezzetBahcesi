import catchAsyncError from "../middleware/catch.middleware.js";
import Footer from "../models/footer.models.js";

const footerCreate = catchAsyncError(async (req, res, next) => {
  const footer = await Footer.findOne().lean();

  if (footer) {
    const updated = await Footer.findByIdAndUpdate(
      footer._id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    return res.status(200).json({ footer: updated });
  } else {
    const newFooter = await Footer.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(201).json({ footer: newFooter });
  }
});

const footerGet = catchAsyncError(async (req, res, next) => {
  const footer = await Footer.find({}).lean();
  return res.status(201).json({
    footer,
  });
});

export default { footerCreate, footerGet };
