import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
} from "@mui/material";
import { FieldConfig } from "../../../interfaces/modal-form.interface";
import { useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface DynamicFormProps {
  fields: FieldConfig[];
  formik: ReturnType<typeof useFormikContext<any>>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, formik }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={2}
      >
        {fields.map((field) => {
          const {
            name,
            label,
            type,
            required,
            multiple = false,
            disabled,
          } = field;

          const error = formik.touched[name] && Boolean(formik.errors[name]);
          const helperText = formik.touched[name] ? formik.errors[name] : "";

          const fullWidthColumn = field.multiline || type === "file";

          return (
            <Box key={name} gridColumn={fullWidthColumn ? "span 2" : "span 1"}>
              {type === "text" || type === "number" ? (
                <TextField
                  fullWidth
                  type={type}
                  name={name}
                  label={label}
                  required={required}
                  disabled={disabled}
                  value={formik.values[name] ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!error}
                  helperText={helperText as string}
                />
              ) : type === "boolean" ? (
                <FormControl fullWidth error={!!error}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={name}
                        checked={formik.values[name] ?? false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={disabled}
                      />
                    }
                    label={label}
                  />
                  {error && <FormHelperText>{}</FormHelperText>}
                </FormControl>
              ) : type === "date" ? (
                  <DatePicker
                    label={label}
                    value={formik.values[name] ? dayjs(formik.values[name]) : null}
                    onChange={(value) => {
                      formik.setFieldValue(name, value);
                    }}
                    disabled={disabled}
                    views={name === "model" ? ["year"] : ["year", "month", "day"]}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required,
                        onBlur: formik.handleBlur,
                        error: !!error,
                        helperText: helperText as string,
                      },
                    }}
                  />
              ) : type === "file" ? (
                <FormControl fullWidth error={!!error}>
                  <InputLabel shrink>{label}</InputLabel>
                  <OutlinedInput
                    type="file"
                    name={name}
                    inputProps={{ multiple }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const files = e.target.files;
                      if (files) {
                        formik.setFieldValue(
                          name,
                          multiple ? Array.from(files) : files[0]
                        );
                      }
                    }}
                    onBlur={formik.handleBlur}
                    notched
                  />
                  {error && <FormHelperText>{}</FormHelperText>}
                </FormControl>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </LocalizationProvider>
  );
};

export default DynamicForm;
