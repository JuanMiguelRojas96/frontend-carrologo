import { useState } from "react";
import { FieldConfig } from "../../../interfaces/modal-form.interface";
import * as Yup from "yup";
import MultiStepModal from "../../organisms/multi-step-modal/MultiStepModal";
import { createVehicle, CreateVehiclePost } from "../../../services/vehicles.service";
import { Image } from "../../../interfaces/commons.interface";
import { useFormik } from "formik";
import DynamicForm from "../../molecules/dynamicform/DynamicForm";

const fields1: FieldConfig[] = [
  { name: "brand", label: "Marca", type: "text", required: true },
  { name: "line", label: "Linea", type: "text", required: true },
  { name: "type", label: "Tipo de Vehiculo", type: "text", required: true },
  { name: "version", label: "Versión", type: "text" },
  { name: "transmission", label: "Transmisión", type: "text" },
  { name: "traction", label: "Tipo de Traccion", type: "text" },
  { name: "fuelType", label: "Tipo de Combustible", type: "text", required: true },
  { name: "kms", label: "Kilometraje", type: "number", required: true },
  { name: "model", label: "Modelo", type: "date", views: ['year'], required: true },
  { name: "displacement", label: "Cilindrada", type: "number" },
  { name: "seatMaterial", label: "Material de Asientos", type: "text" },
  { name: "airbags", label: "Airbags", type: "boolean" },
  { name: "images", label: "Subir Imagenes", type: "file", multiple: true},
];

const fields2: FieldConfig[] = [
  { name: "soat", label: "SOAT", type: "date",  views: ['year'], required: true},
  { name: "technicalReview", label: "Revisión Técnica", type: "date", views: ['year'], required: true },
  { name: "propertyCard", label: "Tarjeta de Propiedad", type: "date", required: true },
  { name: "secure", label: "Seguro", type: "date", required: true },
];

const steps = [
  { title: "Información Básica", fields: fields1 },
  { title: "Documentación", fields: fields2 },
];

const validationSchema = Yup.object({
  brand: Yup.string().required("La marca es obligatoria"),
  line: Yup.string().required("La linea es obligatoria"),
  type: Yup.string().required("El tipo de vehiculo es obligatorio"),
  version: Yup.string(),
  transmission: Yup.string(),
  traction: Yup.string(),
  fuelType: Yup.string().required("El tipo de combustible es obligatorio"),
  kms: Yup.number().typeError("El kilometraje debe ser un número").required("El kilometraje es obligatorio"),
  model: Yup.date().required("El modelo es obligatorio"),
  displacement: Yup.number(),
  seatMaterial: Yup.string(),
  airbags: Yup.boolean(),
  images: Yup.array(),

  // Validaciones para los campos adicionales
  soat: Yup.date().required("El SOAT es obligatorio"),
  technicalReview: Yup.date().required("La revisión técnica es obligatoria"),
  propertyCard: Yup.date().required("La tarjeta de propiedad es obligatoria"),
  secure: Yup.date().required("El seguro es obligatorio"),
});

const initialValues = {
  brand: "",
  line: "",
  type: "",
  version: "",
  transmission: "",
  traction: "",
  fuelType: "",
  kms: 0,
  model: new Date(),
  displacement: 0,
  seatMaterial: "",
  airbags: false,
  images: [],
  soat: "",
  technicalReview: "",
  propertyCard: "",
  technicalSheet: "",
};

interface ModalCreateVehicleProps {
  onClose: () => void;
  onVehicleCreated: () => void; 
}


export const ModalCreateVehicle = ({ onClose, onVehicleCreated }: ModalCreateVehicleProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (data : any) => {
      try {
        const transformedData: CreateVehiclePost = {
          ...data,
          model: new Date(data.model),
          soatDate: new Date(data.soat),
          technicalReviewDate: new Date(data.technicalReview),
          images: data.images?.map((image: Image) => ({
            ...image,
            base64: image.base64?.replace(/^data:image\/[a-z]+;base64,/, ''),
          })) || [],
        };
        await createVehicle(transformedData);
        onVehicleCreated();
        onClose();
      } catch (err) {
        console.error("Error al crear vehículo:", err);
      }
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <MultiStepModal
      open={true}
      onClose={onClose}
      title="Crear Nuevo Vehículo"
      steps={steps}
      currentStep={currentStep}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      canProceed={true}
    >
      {/* Renderiza los campos del paso actual */}
      {steps.map((step, index) => (
    <DynamicForm key={index} fields={step.fields} formik={formik} />
  ))}
    </MultiStepModal>
  );
};
