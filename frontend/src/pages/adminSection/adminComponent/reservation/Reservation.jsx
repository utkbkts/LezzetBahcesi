import { useGetReservationQuery } from "../../../../redux/api/ReservationApi";
import DatePickerData from "./DatePicker";
import TableData from "./Table";

const Reservation = () => {
  const { data: getData } = useGetReservationQuery();

  return (
    <div className="flex gap-4">
      <div className="w-1/5">
        <DatePickerData getData={getData} />
      </div>
      <div className="w-full">
        <TableData getData={getData} />
      </div>
    </div>
  );
};

export default Reservation;
