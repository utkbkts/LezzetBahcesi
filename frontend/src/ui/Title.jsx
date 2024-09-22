import React from "react";
import PropTypes from "prop-types";
const Title = ({ title, titleSub }) => {
  return (
    <div className="flex items-center justify-center relative flex-col gap-4">
      <div className="flex items-center justify-center">
        <div className="w-24 h-[3px] bg-[#fea116]"></div>
        <h1 className="mx-4 text-center">{title}</h1>
        <div className="w-24  h-[3px] bg-[#fea116]"></div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-12 h-[3px] bg-[#fea116]"></div>
        <h6 className="mx-4 text-center text-[#fea116] pacifico-regular">
          {titleSub}
        </h6>
        <div className="w-12 h-[3px] bg-[#fea116]"></div>
      </div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleSub: PropTypes.string.isRequired,
};

export default Title;
