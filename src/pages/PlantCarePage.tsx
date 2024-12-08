import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlantCare, PlantCareResponse } from "../types";
import PlantCareDetails from "../components/PlantCareDetails";

function PlantCarePage() { 
  const { plantId } = useParams();
  const [plantCareData, setPlantCareData] = useState<PlantCare[] | null>(null); 
  
  useEffect(() => {
    if (plantId) {
      fetchPlantCareData(plantId);
    }
  }, []);

  console.log(plantCareData, 'plantCareDATa')

  async function fetchPlantCareData(plantId:string){
    const response = await fetch(`/api/plant/care/${plantId}`);
    const responseData: PlantCareResponse = await response.json();
    setPlantCareData(responseData.plantCare);
  }

  console.log('I am plantId', plantId); 

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 content-center min-h-[calc(100vh-2rem)]">
      I am plantID: {plantId}
      <PlantCareDetails/>
    </main>
  );
}

export default PlantCarePage;
