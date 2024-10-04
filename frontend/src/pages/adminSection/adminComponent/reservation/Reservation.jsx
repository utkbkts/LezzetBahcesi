import { useGetReservationQuery } from "../../../../redux/api/ReservationApi";
import DatePickerData from "./DatePicker";
import TableData from "./Table";

const Reservation = () => {
  const { data: getData } = useGetReservationQuery();

  return (
    <div className="flex gap-4 2xl:flex-row flex-col 2xl:items-start items-center justify-center">
      <div className="2xl:w-1/5 w-full">
        <DatePickerData getData={getData} />
      </div>
      <div className="w-full">
        <TableData getData={getData} />
      </div>
    </div>
  );
};

export default Reservation;
