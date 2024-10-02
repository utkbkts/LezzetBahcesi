import catchAsyncError from "../middleware/catch.middleware.js";
import Reservation from "../models/reservation.models.js";
import ErrorHandler from "../utils/errorHandler.js";

const reservationSave = catchAsyncError(async (req, res, next) => {
  const { name, lastname, times, table, numberOfPeople, note, status } =
    req.body;

  if (Object.values(req.body).every((value) => !value)) {
    return next(new ErrorHandler("Hepsini doldurunuz", 400));
  }
  const reserver = await Reservation.create({
    name,
    lastname,
    times,
    table,
    numberOfPeople,
    note,
    status,
  });

  res.status(200).json({ reserver });
});

const reservationGet = catchAsyncError(async (req, res, next) => {
  const reserver = await Reservation.find();

  res.status(200).json({ reserver });
});

const reservationUpdate = catchAsyncError(async (req, res, next) => {
  const reserver = await Reservation.findById(req?.params?.id);
  console.log("🚀 ~ reservationUpdate ~ reserver:", reserver);

  if (!reserver) {
    return next(new ErrorHandler("Reserver bulunamadı !", 404));
  }

  if (reserver.status === "Çıkış Yaptı") {
    return next(new ErrorHandler("Bu kişi zaten çıkış yaptı. !", 404));
  }
  console.log(req.body.status);
  if (req.body.status === "Çıkış Yaptı") {
    reserver.status = "Çıkış Yaptı";
    reserver.times = "";
  } else {
    reserver.status = req.body.status;
  }
  await reserver.save();
  res.status(200).json({
    success: true,
    message: "Rezervasyon durumu başarıyla güncellendi.",
  });
});

export default { reservationSave, reservationGet, reservationUpdate };
