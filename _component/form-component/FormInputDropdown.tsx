import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputDropdown: React.FC<FormSelectInputProps> = ({
  name,
  control,
  label,
  options,
  required,
  helperText,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl variant="standard" sx={{ minWidth: 150 }}>
      <InputLabel required={required}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select onChange={onChange} value={value ?? ""}>
              {generateSingleOptions()}
            </Select>
            <FormHelperText error={error ? true : false}>
              {error ? error.message : helperText}
            </FormHelperText>
          </>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
