import React from "react";
import PropTypes from "prop-types";

const InputField = ({ value, onChange, className, placeholder, type }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, // Make sure onChange is required
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputField;
