
export interface Transaction {
  comprador: string;
  vendedor: string;
  monto: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  placa: string;
  vehiculo?: string;
  descripcion: string;
}