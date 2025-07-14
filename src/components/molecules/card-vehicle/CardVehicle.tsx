import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Dialog,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Vehicle } from "../../../interfaces/vehicles.interface";
import { ModalEditVehicle } from "../../templates/modal-edit-vehicle/ModalEditVehicle";
import { ModalViewVehicle } from "../../templates/modal-view-vehicle/ModalViewVehicle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DirectionsCar } from "@mui/icons-material";

interface CardVehicleProps {
  vehicle: Vehicle;
}

const CardVehicle: React.FC<CardVehicleProps> = ({ vehicle }) => {
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const url = vehicle.url_images

  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <Card>
        <CardHeader
          avatar={<DirectionsCar sx={{ fontSize: 50 }} />}
          title={<strong style={{ fontSize: '1.2rem' }}>{`${vehicle.brand} ${vehicle.line}`}</strong>}
          subheader={new Date(vehicle.model).getFullYear().toString()}
        />
        <CardContent>
          <p>
            <strong>Cilindraje:</strong> {vehicle.displacement} cc
          </p>
          <p>
            <strong>Transmisión:</strong> {vehicle.transmission}
          </p>
          <p>
            <strong>Kilometraje:</strong> {vehicle.kms.toLocaleString()} Km
          </p>
          <p>
            <strong>Tipo de Combustible :</strong> {vehicle.fuel_type}
          </p>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpenView}>
            Ver detalles
          </Button>
          <Button
            size="small"
            onClick={handleOpenEdit}
            startIcon={<ModeEditIcon />}
          >
            Editar
          </Button>
          <Button
            size="small"
            onClick={() => window.open(url, "_blank")}
            
            variant="contained"
          >
            Ver imagenes
          </Button>
        </CardActions>
      </Card>

      <Dialog open={openView} onClose={handleCloseView} maxWidth="md" fullWidth>
        <ModalViewVehicle
          onClose={handleCloseView}
          initialValues={vehicle}
        />
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <ModalEditVehicle
          onClose={handleCloseEdit}
          vehicleId={vehicle.id}
          initialData={{
            ...vehicle,
            images: vehicle.url_images
              ? [
                  {
                    base64: vehicle.url_images,
                    name: "imagen-vehiculo.jpg",
                  },
                ]
              : [],
          }}
          onVehicleEdited={handleCloseEdit}
        />
      </Dialog>
    </>
  );
};

export default CardVehicle;