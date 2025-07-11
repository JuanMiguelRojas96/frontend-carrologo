import  { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import { Cake, CalendarToday } from "@mui/icons-material";
import { getClients } from "../../../services/clients.service";
import { Client } from "../../../interfaces/clients.interface";

const BirthdateList = () => {
  const [clientesProximos, setClientesProximos] = useState<
    { cliente: Client; diasFaltantes: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getClients(1, 100);
        const clientes: Client[] = res.data;

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const cumpleEnMenosDe30Dias = clientes
          .map((cliente) => {
            const nacimiento = new Date(cliente.birthdate);
            const cumple = new Date(
              hoy.getFullYear(),
              nacimiento.getMonth(),
              nacimiento.getDate()
            );

            if (cumple < hoy) {
              cumple.setFullYear(hoy.getFullYear() + 1);
            }

            const msPorDia = 1000 * 60 * 60 * 24;
            const diasFaltantes = Math.ceil(
              (cumple.getTime() - hoy.getTime()) / msPorDia
            );

            return { cliente, diasFaltantes };
          })
          .filter(({ diasFaltantes }) => diasFaltantes <= 30)
          .sort((a, b) => a.diasFaltantes - b.diasFaltantes);

        setClientesProximos(cumpleEnMenosDe30Dias);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={<Cake sx={{ color: "#1e76e9ff" }} />}
        title={
          <Typography variant="h6" fontWeight="bold">
            Próximos Cumpleaños
          </Typography>
        }
      />
      <CardContent>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : clientesProximos.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CalendarToday sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography color="text.secondary">
              No hay cumpleaños próximos en los próximos 30 días.
            </Typography>
          </Box>
        ) : (
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {clientesProximos.map(({ cliente, diasFaltantes }) => (
              <ListItem
                key={cliente.id}
                sx={{
                  background: "linear-gradient(135deg, rgba(241, 247, 255, 1) 0%, #e4f2ffff 100%)",
                  borderRadius: 2,
                  mb: 1,
                  border: "1px solid #0066ffff",
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#1e76e9ff" }}>
                    <Cake />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${cliente.name} ${cliente.lastName}`}
                  secondary={` ${new Date(cliente.birthdate).toLocaleDateString(
                    "es-ES"
                  )}`}
                />
                <Chip
                  label={
                    diasFaltantes === 0
                      ? "¡Hoy!"
                      : diasFaltantes === 1
                      ? "Mañana"
                      : `${diasFaltantes} días`
                  }
                  color={diasFaltantes <= 7 ? "primary" : "default"}
                  variant="filled"
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default BirthdateList;
