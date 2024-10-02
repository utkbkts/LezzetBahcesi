import catchAsyncError from "../middleware/catch.middleware.js";
import Product from "../models/product.models.js";
import apiFilter from "../utils/apiFilters.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

const getAllProduct = catchAsyncError(async (req, res) => {
  const resPerPage = 5;

  const apiFilters = new apiFilter(Product, req.query).searchResult().filters();

  let products = await apiFilters.query.clone();
  let FilteredProductCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    FilteredProductCount,
    products,
  });
});

const getCategoryProductAll = catchAsyncError(async (req, res) => {
  const product = await Product.find({});

  res.status(200).json({
    product,
  });
});

const productById = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req?.params?.id).populate(
    "reviews.user"
  );

  if (!product) {
    return next(new ErrorHandler("Product not found !", 404));
  }
  return res.status(200).json({
    product,
  });
});
//user
const getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate("reviews.user");

  if (!product) {
    return next(new ErrorHandler("Product not found !", 404));
  }
  return res.status(200).json({
    reviews: product.reviews,
  });
});

//admin

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const uploadPromises = req.body.images.map((image) =>
    upload_file(image, "shopit/products")
  );
  const urls = await Promise.all(uploadPromises);

  const product = await Product.create({
    ...req.body,
    images: urls,
    user: req.user._id,
  });

  res.status(200).json({ product });
});

const getProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.find().populate("reviews.user user");

  res.status(200).json({
    product,
  });
});

const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await delete_file(product.images[i].public_id);
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product Deleted",
  });
});

const createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found !", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  return res.status(200).json({
    success: true,
  });
});

const getReviews = catchAsyncError(async (req, res, next) => {
  const userId = req?.query?.userId;

  // Kullanıcıya ait ürünleri bul
  const products = await Product.find({ "reviews.user": userId }).populate(
    "reviews.user"
  );

  if (!products || products.length === 0) {
    return next(new ErrorHandler("No products found for this user!", 404));
  }

  const productReviews = products.map((product) => ({
    productId: product._id,
    productName: product.title,
    reviews: product.reviews,
  }));

  return res.status(200).json({
    reviews: productReviews,
  });
});

const deleteReviews = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found !", 404));
  }

  const reviews = product?.reviews?.filter(
    (reviwe) => reviwe._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    { new: true }
  );
  return res.status(200).json({
    product,
  });
});

export default {
  createProduct,
  getProducts,
  deleteProduct,
  getAllProduct,
  productById,
  createProductReviews,
  getReviews,
  deleteReviews,
  getProductReview,
  getCategoryProductAll,
};
