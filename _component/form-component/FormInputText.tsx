import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputText = ({
  name,
  control,
  label,
  helperText,
  required,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : helperText}
          error={!!error}
          required={required}
          onChange={onChange}
          value={value ?? ""}
          label={label}
          variant="standard"
        />
      )}
    />
  );
};
