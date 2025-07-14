import { useEffect, useState } from "react";
import { VehiclesTableData } from "../../../interfaces/vehicles.interface";
import TabsVehicles from "../../molecules/tabs/TabsVehicles";
import { getVehicles } from "../../../services/vehicles.service";


const Vehicles = () => {

  const [vehiclesData, setVehiclesData] = useState<VehiclesTableData>({} as VehiclesTableData);
  
  const fetchVehicles = async (page: number = 1, limit: number = 50) => {
    try {
      const data = await getVehicles(page, limit);
      setVehiclesData(data);
    } catch (error) {
      console.error("Error al obtener vehiculos:", error);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  return( 
    <div>
      <TabsVehicles 
        dataVehicles={vehiclesData.data || []}
        onUpdateVehicles={fetchVehicles}
        pagination={vehiclesData.pagination}
      />
    </div>
  )
}

export default Vehicles;
