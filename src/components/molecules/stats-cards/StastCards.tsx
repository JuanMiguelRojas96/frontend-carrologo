import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  People,
  DirectionsCar,
  Receipt,
  Schedule,
} from "@mui/icons-material";

import { getClients } from "../../../services/clients.service";
import { getVehicles } from "../../../services/vehicles.service";

const StatsCards = () => {
  const [totalClients, setTotalClients] = useState<number>(0);
  const [totalVehicles, setTotalVehicles] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [clientsRes, vehiclesRes] = await Promise.all([
          getClients(1, 1000),
          getVehicles(1, 1000),
        ]);

        setTotalClients(clientsRes.data.length);
        setTotalVehicles(vehiclesRes.data.length);
      } catch (error) {
        console.error("Error al obtener datos de estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Cantidad de clientes",
      value: totalClients,
      icon: People,
      bgColor: "rgba(80, 174, 252, 0.8)",
    },
    {
      title: "Vehículos totales",
      value: totalVehicles,
      icon: DirectionsCar,
      bgColor: "rgba(80, 174, 252, 0.8)",
    },
    {
      title: "Transacciones totales",
      value: 0,
      icon: Receipt,
      bgColor: "#3acc3e98",
    },
    {
      title: "Transacciones pendientes",
      value: 0,
      icon: Schedule,
      bgColor: "#ffb950ff",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            py: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 24px)",
                  md: "1 1 calc(25% - 24px)",
                },
              }}
            >
              <Card
                sx={{
                  backgroundColor: stat.bgColor,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
                  },
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        component="h2"
                        fontWeight="bold"
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        width: 56,
                        height: 56,
                        color: stat.bgColor,
                      }}
                    >
                      <Icon />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default StatsCards;
