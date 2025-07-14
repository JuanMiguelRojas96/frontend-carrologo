import "./TransactionCard.css";

import React from "react";

interface ReceiptCardProps {
  comprador: string;
  vendedor: string;
  fechaInicio: string;
  fechaFin: string;
  monto: string;
  estado: boolean | string;
  placa: string;
  descripcion: string;
  vehiculo?: string;
}

const TransactionCard: React.FC<ReceiptCardProps> = ({
  comprador,
  vendedor,
  fechaInicio,
  fechaFin,
  descripcion,
  monto,
  placa,
  estado,
  vehiculo,

}) => {
  return (
    <div className="ticket">
      <div className="ticket_content">
				<div className="ticket_header">
					<h1 className="h1-transactions">{vehiculo} - {placa}</h1>
          <p className="p-transactions"> Comprador: {comprador}</p>
          <p className="p-transactions">Vendedor: {vendedor}</p>
					<p className="p-transactions">Monto: {monto}</p>
          <p className="p-transactions">Fecha: {fechaInicio} - {fechaFin}</p>
					<p className="p-transactions">Estado: {estado}</p>
          <p className="p-transactions">Descripcion:</p>
          <p className="p-transactions-description">{descripcion}</p>
				</div>
			</div>
    </div>
  );
};

export default TransactionCard;
