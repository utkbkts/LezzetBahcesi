import catchAsyncError from "../middleware/catch.middleware.js";
import Reservation from "../models/reservation.models.js";
import ErrorHandler from "../utils/errorHandler.js";

const reservationSave = catchAsyncError(async (req, res, next) => {
  const { name, times, table, numberOfPeople, note, status, lastname, email } =
    req.body;

  if (!name || !times || !table || !numberOfPeople || !note) {
    return next(new ErrorHandler("Hepsini doldurunuz", 400));
  }

  const reserver = await Reservation.create({
    name,
    times,
    table,
    numberOfPeople,
    note,
    status,
    email,
    lastname,
  });

  res.status(200).json({ reserver });
});
const reservationGet = catchAsyncError(async (req, res, next) => {
  const reserver = await Reservation.find();

  res.status(200).json({ reserver });
});

const reservationUpdate = catchAsyncError(async (req, res, next) => {
  const reserver = await Reservation.findById(req?.params?.id);

  if (!reserver) {
    return next(new ErrorHandler("Reserver bulunamadı !", 404));
  }

  if (reserver.status === "Çıkış Yaptı") {
    return next(new ErrorHandler("Bu kişi zaten çıkış yaptı. !", 404));
  }
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
const resetvationDelete = catchAsyncError(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    return next(new ErrorHandler("Rezervasyon bulunamadı", 404));
  }
  await reservation.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Silme işlemi başarılı",
  });
});

export default {
  reservationSave,
  reservationGet,
  reservationUpdate,
  resetvationDelete,
};
