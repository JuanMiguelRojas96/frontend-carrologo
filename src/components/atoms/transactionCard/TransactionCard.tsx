import "./TransactionCard.css";

import React from "react";

interface ReceiptCardProps {
  plataforma: string;
  referencia: string;
  fecha: string;
  hora: string;
  comercio: string;
  monto: string;
}

const TransactionCard: React.FC<ReceiptCardProps> = ({

}) => {
  return (
    <div className="ticket">
      <div className="ticket_content">
				<div className="ticket_header">
					<p>hola</p>
				</div>
			</div>
    </div>
  );
};

export default TransactionCard;
