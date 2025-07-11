import TransactionCard from "../../atoms/transactionCard/TransactionCard";
import TabsTransactions from "../../molecules/tabs/TabsTransactions";


const Transactions = () => {


  return( 
    <>
      <TabsTransactions dataTransactions={[]} />
        <TransactionCard
          vehiculo="Toyota Corolla"
          placa="ABC123"
          estado="Aprobada"
          monto="$100.00"
        comprador="Juan Perez"
        vendedor="Maria Lopez"
        fechaInicio="2023-10-01"
        fechaFin="2023-10-31"
        descripcion="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."      
      />
              <TransactionCard
          vehiculo="Toyota Corolla"
          placa="ABC123"
          estado="Aprobada"
          monto="$100.00"
        comprador="Juan Perez"
        vendedor="Maria Lopez"
        fechaInicio="2023-10-01"
        fechaFin="2023-10-31"
        descripcion="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."      
      />
              <TransactionCard
          vehiculo="Toyota Corolla"
          placa="ABC123"
          estado="Aprobada"
          monto="$100.00"
        comprador="Juan Perez"
        vendedor="Maria Lopez"
        fechaInicio="2023-10-01"
        fechaFin="2023-10-31"
        descripcion="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."      
      />
              <TransactionCard
          vehiculo="Toyota Corolla"
          placa="ABC123"
          estado="Aprobada"
          monto="$100.00"
        comprador="Juan Perez"
        vendedor="Maria Lopez"
        fechaInicio="2023-10-01"
        fechaFin="2023-10-31"
        descripcion="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."      
      />
    </>

  )
}

export default Transactions;
