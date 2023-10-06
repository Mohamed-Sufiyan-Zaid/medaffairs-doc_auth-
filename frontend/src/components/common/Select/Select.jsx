import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./Select.scss";

export default function Select({
  value = "",
  onChange = () => {},
  label,
  placeholder = label,
  options = [],
  margin = "",
  padding = "",
  isDisabled = false,
  isLoading = false,
  loadingText = "Loading...",
  isError = false,
  errorText = "Something went wrong!"
}) {
  const customRenderValue = (val) => {
    if (val != null && val !== "") {
      return val;
    }
    return <div className="select-placeholder">{placeholder}</div>;
  };

  return (
    <FormControl className="mui-custom-select" sx={{ margin, padding }} fullWidth>
      {label && <FormLabel className="mb-2">{label}</FormLabel>}
      <MuiSelect disabled={isDisabled} value={value} displayEmpty onChange={onChange} label="" renderValue={customRenderValue}>
        {isLoading ? (
          <MenuItem disabled>
            <div className="custom-select-menu-item last">{loadingText}</div>
          </MenuItem>
        ) : isError ? (
          <MenuItem disabled>
            <div className="custom-select-menu-item last">{errorText}</div>
          </MenuItem>
        ) : (
          options.map((item, index) => (
            <MenuItem key={index} value={item}>
              <div className={`custom-select-menu-item ${index === options.length - 1 ? "last" : ""}`}>{item}</div>
            </MenuItem>
          ))
        )}
      </MuiSelect>
    </FormControl>
  );
}
