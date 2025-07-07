import "./TransactionCard.css";

import React from "react";

interface ReceiptCardProps {
  plataforma: string;
  referencia: string;
  fecha: string;
  hora: string;
  comercio: string;
  monto: string;
  estado: boolean | string;
  vehiculo: string;
  placa: string;
}

const TransactionCard: React.FC<ReceiptCardProps> = ({
  referencia,
  fecha,
  hora,
  comercio,
  monto,
  estado,
  vehiculo,
  placa,

}) => {
  return (
    <div className="ticket">
      <div className="ticket_content">
				<div className="ticket_header">
					<h1>{vehiculo} {placa}</h1>
          <p>{comercio}</p>
					<p>Referencia: {referencia}</p>
					<p>{fecha} - {hora}</p>
					<p>{monto}</p>
					<p>{estado}</p>
				</div>
			</div>
    </div>
  );
};

export default TransactionCard;
