import Select from "react-select";

const SelectInput = ({ handleSetLimit, limitValue }) => {
  const options = [
    { value: 100, label: 100 },
    { value: 75, label: 75 },
    { value: 50, label: 50 },
    { value: 25, label: 25 },
    { value: 12, label: 12 },
    { value: 5, label: 5 },
    { value: 1, label: 1 },
  ];

  return (
    <Select
      className="selectContainer"
      classNamePrefix="selectContainer"
      value={limitValue}
      onChange={handleSetLimit}
      options={options}
      placeholder={`Limit : ${limitValue}`}
    />
  );
};
export default SelectInput;
