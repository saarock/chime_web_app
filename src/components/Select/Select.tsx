// Import all the necessary dependencies here
import React from "react";

// Select props interface
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  extraOptions?: { value: string | number; lable: string }[];
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  extraOptions,
  ...props
}) => {
  return (
    <>
      <select {...props} className={`${props.className} chime-select`}>
        <option value="any">-- Choose a {label} --</option>
        {options
          ? options?.map((option) => <option value={option}>{option}</option>)
          : extraOptions &&
            extraOptions?.map((option) => (
              <option value={option.value}>{option.lable}</option>
            ))}
      </select>
    </>
  );
};

export default Select;
