import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale";
import {
  CircleArrowOutDownLeft,
  CircleCheckBig,
  CircleX,
  Clock9,
  TableCellsSplit,
} from "lucide-react";
import PropTypes from "prop-types";

const DatePickerData = ({ getData }) => {
  const reservedDates =
    getData?.reserver?.map((reservation) => new Date(reservation.times)) || [];

  console.log("🚀 ~ DatePickerData ~ reservedDates:", getData);
  const isDateDisabled = (date) => {
    return reservedDates.some(
      (reservedDate) =>
        date.getFullYear() === reservedDate.getFullYear() &&
        date.getMonth() === reservedDate.getMonth() &&
        date.getDate() === reservedDate.getDate()
    );
  };
  return (
    <div className="w-full">
      <DatePicker
        inline
        readOnly
        dateFormat="Pp"
        locale={tr}
        timeCaption="Saat"
        timeFormat="HH:mm"
        filterDate={(date) => !isDateDisabled(date)}
      />
      <div className="pt-2">
        <h5>Zaman Dilimleri</h5>
        <div className="grid grid-cols-2 pt-2">
          <span className="relative py-2 px-4 border">
            Sabah
            <span className="bg-green-500 w-2 h-2 rounded-full absolute"></span>
          </span>
          <span className="relative py-2 px-4 border">
            Öğle{" "}
            <span className="bg-red-500 w-2 h-2 rounded-full absolute"></span>
          </span>
          <span className="relative py-2 px-4 border">
            Akşam{" "}
            <span className="bg-blue-500 w-2 h-2 rounded-full absolute"></span>
          </span>
          <span className="relative py-2 px-4 border">
            Gece{" "}
            <span className="bg-yellow-500 w-2 h-2 rounded-full absolute"></span>
          </span>
        </div>
      </div>
      <div className="pt-2">
        <h5>Statü Tipleri</h5>
        <div className="grid grid-cols-2 pt-2">
          <span className="flex gap-2 items-center py-2 px-4 border">
            Bekliyor
            <Clock9 size={20} className="text-gray-200" />
          </span>
          <span className="flex gap-2 items-center py-2 px-4 border">
            İptal <CircleX size={15} className="text-red-500" />
          </span>
          <span className="flex gap-2 items-center py-2 px-4 border">
            Oturuyor <TableCellsSplit size={20} className="text-gray-500" />
          </span>
          <span className="flex gap-2 items-center py-2 px-4 border">
            Çıkış yaptı{" "}
            <CircleArrowOutDownLeft size={15} className="text-gray-500" />
          </span>
          <span className="flex gap-2 items-center py-2 px-4 border">
            Onaylı <CircleCheckBig size={15} className="text-green-500" />
          </span>{" "}
        </div>
      </div>
    </div>
  );
};
DatePickerData.propTypes = {
  getData: PropTypes.shape({
    reserver: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        times: PropTypes.string.isRequired,
        numberOfPeople: PropTypes.number.isRequired,
        table: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default DatePickerData;
