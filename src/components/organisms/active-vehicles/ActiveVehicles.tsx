import { Grid, Box } from "@mui/material";
import CardVehicle from "../../molecules/card-vehicle/CardVehicle";
import { Vehicle } from "../../../interfaces/vehicles.interface";
import SimplePagination from "../../atoms/simple-pagination/SimplePagination";

interface ActiveVehiclesProps {
  vehicles: Vehicle[];
  pagination?: { page: number; total: number };
  paginationModel: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
}

const ActiveVehicles: React.FC<ActiveVehiclesProps> = ({ 
  vehicles, 
  pagination,
  paginationModel,
  onPaginationChange 
}) => {
  
  const handlePageChange = (page: number) => {
    onPaginationChange(page, paginationModel.pageSize);
  };

  const handleItemsPerPageChange = (pageSize: number) => {
    onPaginationChange(1, pageSize); // Reset to page 1 when changing page size
  };

  return (
    <Box>
      {/* Paginador superior */}
      {pagination && (
        <Box sx={{ mb: 2 }}>
          <SimplePagination
            currentPage={paginationModel.page + 1}
            totalItems={pagination.total}
            itemsPerPage={paginationModel.pageSize}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            position="top"
          />
        </Box>
      )}
      
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 20 }}
      >
        {vehicles.map((vehicle, index) => (
          <Grid size={4} key={index}>
            <CardVehicle vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
      
      {/* Paginador inferior */}
      {pagination && (
        <Box sx={{ mt: 2 }}>
          <SimplePagination
            currentPage={paginationModel.page + 1}
            totalItems={pagination.total}
            itemsPerPage={paginationModel.pageSize}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            position="bottom"
          />
        </Box>
      )}
    </Box>
  );
};

export default ActiveVehicles;
