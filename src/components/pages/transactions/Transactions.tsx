import TransactionCard from "../../atoms/transactionCard/TransactionCard";

const Transactions = () => {


  return( 
    <>
      <div>
        <h1>Transactions Page</h1>
      </div>
      <TransactionCard
        vehiculo="Carro"
        placa="ABC123"
        estado="Aprobada"
        monto="$100.00"
        referencia="xxxx-xxxx-xxxx"
        fecha="2023-10-01"
        hora="10:00 AM"
        comercio="Comercio Ejemplo"
        plataforma="Nequi"
      />
    </>

  )
}

export default Transactions;
