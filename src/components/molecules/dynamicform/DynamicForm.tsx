import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import { FieldConfig } from "../../../interfaces/modal-form.interface";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ImageUploadField from "../image-upload-field/ImageUploadField";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface DynamicFormProps {
  fields: FieldConfig[];
  formik: {
    values: Record<string, any>;
    errors: Record<string, any>;
    touched: Record<string, any>;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    setFieldValue: (field: string, value: any) => void;
    getFieldProps: (field: string) => any;
  };
  isEditMode?: boolean;
  imageUrl?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, formik, isEditMode = false, imageUrl }) => {
  const handleOpenImage = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };
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
                  {error && <FormHelperText>{helperText as string}</FormHelperText>}
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
                isEditMode && name === "images" ? (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Button
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                      onClick={handleOpenImage}
                      disabled={!imageUrl}
                      fullWidth
                    >
                      Ver Imagenes del Vehículo
                    </Button>
                  </Box>
                ) : (
                  <ImageUploadField
                    field={field}
                    formikField={formik.getFieldProps(name)}
                    setFieldValue={formik.setFieldValue}
                    touched={formik.touched}
                    errors={formik.errors}
                  />
                )
              ) : null}
            </Box>
          );
        })}
      </Box>
    </LocalizationProvider>
  );
};

export default DynamicForm;
