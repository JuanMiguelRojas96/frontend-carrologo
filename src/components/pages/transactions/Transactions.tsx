import TransactionCard from "../../atoms/transactionCard/TransactionCard";

const Transactions = () => {


  return( 
    <>
      <div>
        <h1>Transactions Page</h1>
      </div>
      <TransactionCard
        monto="$100.00"
        referencia="Pago por servicios prestados"
        fecha="2023-10-01"
        hora="10:00 AM"
        comercio="Comercio Ejemplo"
        plataforma="Nequi"
      />
    </>

  )
}

export default Transactions;
