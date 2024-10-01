import PropTypes from "prop-types";

const InputField = ({ value, className, placeholder, type }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onchange}
      className={className}
      placeholder={placeholder}
    ></input>
  );
};

InputField.propTypes = {
    value : PropTypes.string,
    className : PropTypes.string, 
    placeholder : PropTypes.string, 
    type : PropTypes.string
}

export default InputField;
