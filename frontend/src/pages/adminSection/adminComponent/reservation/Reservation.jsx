import DatePickerData from "./DatePicker";
import TableData from "./Table";

const Reservation = () => {
  return (
    <div className="flex gap-4">
      <div className="w-1/5">
        <DatePickerData />
      </div>
      <div className="w-full">
        <TableData />
      </div>
    </div>
  );
};

export default Reservation;
