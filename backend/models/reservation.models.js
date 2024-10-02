import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  times: {
    type: String,
    required: false,
  },
  table: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["Bekliyor", "Oturuyor", "İptal", "Onaylı", "Çıkış Yaptı"],
      message: "Lütfen Statü'yü belirleyiniz.",
    },
    default: "Bekliyor",
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
