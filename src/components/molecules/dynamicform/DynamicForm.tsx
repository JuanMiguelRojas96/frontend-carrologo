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
  Select,
  MenuItem,
} from "@mui/material";
import { FieldConfig } from "../../../interfaces/modal-form.interface";
import { useFormikContext } from "formik";

interface DynamicFormProps {
  fields: FieldConfig[];
  formik: ReturnType<typeof useFormikContext<any>>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, formik }) => {
  return (
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

        // Si es multiline o tipo "file", que ocupe toda la fila
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
            ) : type === "date" && name === "model" ? (
              // Solo para el campo "model" renderizamos un Select de años
              <FormControl fullWidth error={!!error}>
                <InputLabel shrink>{label}</InputLabel>
                <Select
                  fullWidth
                  name={name}
                  value={formik.values[name]?.getFullYear?.() || ""}
                  onChange={(e) => {
                    const selectedYear = parseInt(e.target.value, 10);
                    const newDate = new Date();
                    newDate.setFullYear(selectedYear, 0, 1); // Enero 1 del año seleccionado
                    formik.setFieldValue(name, newDate);
                  }}
                  onBlur={formik.handleBlur}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Selecciona un año
                  </MenuItem>
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </Select>
                {error && <FormHelperText>{}</FormHelperText>}
              </FormControl>
            ) : type === "date" ? (
              <TextField
                fullWidth
                type="date"
                name={name}
                label={label}
                required={required}
                InputLabelProps={{ shrink: true }}
                disabled={disabled}
                value={formik.values[name]?.slice?.(0, 10) || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!error}
                helperText={helperText as string}
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
  );
};

export default DynamicForm;
