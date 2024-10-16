import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";
const FormWorking = ({ setDayHourValues, form, dayHourValues }) => {
  const handleClickDown = (e) => {
    e.preventDefault();

    const day = form.getFieldValue("day");
    const hours = form.getFieldValue("hours");
    if (day && hours) {
      setDayHourValues((prevState) => ({
        ...prevState,
        dayhourValue: [
          ...prevState.dayhourValue,
          {
            dayRange: day,
            hourRange: hours,
          },
        ],
      }));
      form.resetFields(["day", "hours"]);
    }
  };

  const validateDayHour = (_, value) => {
    if (dayHourValues.dayhourValue.length > 0) {
      return Promise.resolve();
    }
    if (!value) {
      return Promise.reject(new Error("Bu alan zorunludur."));
    }
    return Promise.resolve();
  };
  const handleRemoveTag = (indexToRemove) => {
    const filteredValues = dayHourValues.dayhourValue.filter(
      (_, index) => index !== indexToRemove
    );
    setDayHourValues((prevState) => ({
      ...prevState,
      dayhourValue: filteredValues,
    }));
  };

  return (
    <div>
      {" "}
      <Form.Item
        label="Günler"
        name="day"
        rules={[{ validator: validateDayHour }]}
      >
        <Input
          type="text"
          placeholder="günleri iki gün şeklinde pazartesi - cumartesi şeklinde giriniz."
        />
      </Form.Item>
      <Form.Item
        label="Saatler"
        name="hours"
        rules={[{ validator: validateDayHour }]}
      >
        <Input
          type="text"
          placeholder="lütfen saat aralığı giriniz 09.00 - 23.00 şeklinde."
        />
      </Form.Item>
      {dayHourValues.dayhourValue.map((item, index) => (
        <>
          <div key={index} className="flex flex-wrap gap-2 mt-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
              <span>{`${item.dayRange} - ${item.hourRange}`}</span>
              <button
                onClick={() => handleRemoveTag(index)}
                className="ml-2 text-white hover:text-red-400"
              >
                &times;
              </button>
            </span>
          </div>
        </>
      ))}
      <Button
        onClick={handleClickDown}
        className="mt-2"
        htmlType="button"
        type="primary"
      >
        Ekle
      </Button>
    </div>
  );
};

FormWorking.propTypes = {
  setDayHourValues: PropTypes.func,
  form: PropTypes.any,
  dayHourValues: PropTypes.shape({
    dayhourValue: PropTypes.arrayOf(
      PropTypes.shape({
        dayRange: PropTypes.string,
        hourRange: PropTypes.string,
      })
    ),
  }),
};

export default FormWorking;
