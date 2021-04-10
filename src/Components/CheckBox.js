const CheckBox = (props) => {
  const { className, favored, iconOnClick } = props;
  return (
    <input
      onClick={iconOnClick}
      className={`${className}  ${favored ? "checked" : "notChecked"}`}
      type="checkbox"
    />
  );
};

export default CheckBox;
