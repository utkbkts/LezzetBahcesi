import React from "react";
import { TiTick } from "react-icons/ti";
import PropTypes from "prop-types";
const CheckOutSteps = ({ currentStep }) => {
  const steps = ["Adres", "Sipariş", "Ödeme"];
  return (
    <React.Fragment>
      {" "}
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step_item ${currentStep === i + 1 && "active"} ${
              i + 1 < currentStep && "completed"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep ? <TiTick size={30} /> : i + 1}
            </div>
            <p className="text-gray-500 ">{step}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
CheckOutSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
export default CheckOutSteps;
