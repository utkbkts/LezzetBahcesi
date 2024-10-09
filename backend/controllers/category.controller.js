import catchAsyncError from "../middleware/catch.middleware.js";
import Category from "../models/category.models.js";
import { upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

const CategoryAdd = catchAsyncError(async (req, res, next) => {
  const { name, image } = req.body;
  let cloudinaryResponse = null;

  if (Object.values(req.body).every((value) => !value)) {
    return next(new ErrorHandler("Hepsini doldurunuz", 400));
  }

  const categoryExists = await Category.findOne({ name: name });

  if (categoryExists) {
    return next(new ErrorHandler("Bu Kategori zaten kullanılıyor."));
  }

  if (image) {
    cloudinaryResponse = await upload_file(image, "shopit/category");
  }
  const category = await Category.create({
    name: name.trim().toLowerCase(),
    image: cloudinaryResponse?.url ? cloudinaryResponse.url : "",
  });
  res.status(200).json({ category });
});
const CategoryGetAll = catchAsyncError(async (req, res, next) => {
  const category = await Category.find({}).sort({ name: "asc" }).lean();
  res.status(200).json({ category });
});

export default { CategoryAdd, CategoryGetAll };
