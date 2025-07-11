import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import { useMemo, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TabPanel } from "../../atoms/tabPanel/TabPanel";
import { Transaction } from "../../../interfaces/transactions.interface";

interface TabsTransactionsProps {
  dataTransactions: Transaction[];
  pagination?: { page: number; total: number };
}

const TabsTransactions = ({
  dataTransactions,
  pagination,
}: TabsTransactionsProps) => {
  const [value, setValue] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("comprador");

  const handleChange = (newValue: string) => setValue(newValue);

  const searchOptions = [
    { value: "comprador", label: "Comprador" },
    { value: "vendedor", label: "Vendedor" },
    { value: "vehiculo", label: "Vehículo" },
    { value: "placa", label: "Placa" },
    { value: "estado", label: "Estado" },
    { value: "monto", label: "Monto" },
  ];

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return dataTransactions;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return dataTransactions.filter((t) => {
      const value = t[searchField as keyof Transaction];
      return value?.toString().toLowerCase().includes(lowerSearchTerm);
    });
  }, [dataTransactions, searchTerm, searchField]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          m: 2,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 1 },
        }}
      >
        <Button
          variant="contained"
          onClick={() => console.log("Agregar transacción (futuro modal)")}
          sx={{
            minWidth: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "300px" },
          }}
        >
          Agregar Transacción
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            m: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: { xs: 2, sm: 1 },
          }}
        >
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: "100%", sm: 150 },
              maxWidth: { xs: "300px" },
            }}
          >
            <InputLabel id="search-field-label">Buscar por</InputLabel>
            <Select
              labelId="search-field-label"
              value={searchField}
              label="Buscar por"
              onChange={(e) => setSearchField(e.target.value)}
            >
              {searchOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={`Buscar por ${
              searchOptions.find((opt) => opt.value === searchField)?.label.toLowerCase()
            }`}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "200px" },
              maxWidth: { xs: "200px" },
            }}
          />
        </Box>

        <Tabs
          value={value}
          onChange={(_, newValue) => handleChange(newValue)}
          sx={{ mb: 2, height: 40, justifyContent: "center" }}
          centered
        >
          <Tab icon={<GridViewIcon />} value="1" />
          <Tab icon={<ListIcon />} value="2" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default TabsTransactions;
