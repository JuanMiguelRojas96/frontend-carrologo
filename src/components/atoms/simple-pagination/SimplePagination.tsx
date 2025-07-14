import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SimplePaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  position?: 'top' | 'bottom';
}

const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  position = 'bottom'
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const borderStyle = position === 'top' ? 'borderBottom' : 'borderTop';

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        [borderStyle]: '1px solid #e0e0e0',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Por página</InputLabel>
          <Select
            value={itemsPerPage}
            label="Por página"
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        
        <Typography variant="body2">
          {startItem}-{endItem} de {totalItems}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          size="small"
        >
          <ChevronLeft size={20} />
        </IconButton>

        <Typography variant="body2" sx={{ mx: 2 }}>
          Página {currentPage} de {totalPages}
        </Typography>

        <IconButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          size="small"
        >
          <ChevronRight size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SimplePagination;
