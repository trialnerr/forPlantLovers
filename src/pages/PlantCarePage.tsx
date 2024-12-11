import { useLocation, useNavigate } from "react-router-dom";
import { PlantCare, PlantCareResponse, PlantDetails, PlantDetailsResponse, PlantWithNote } from "../types";
import PlantCareChat from "../components/PlantCareChat";
import PlantImages from "../components/PlantCareDetailImages";
import { useEffect, useState } from "react";

function PlantCarePage() {
  const { state } = useLocation();
  const navigate = useNavigate(); 
  console.log(state)
  if (!state) {
    console.log('I am being navigated');
    navigate('../notfound');
  }
  const { plantWithNote } = state as { plantWithNote: PlantWithNote };
  const { cloudinaryImages, commonNames, notes, genus } = plantWithNote;
  const date = new Date(notes[0].idDate).toLocaleDateString();
  const [plantCare, setPlantCare] = useState<PlantCare[] | null>(null);
  const [plantDetails, setPlantDetails] = useState<PlantDetails | null>(null);
  
  async function fetchPlantCareAndDetailsData() {
    const response = await fetch(`/api/plant/care/${genus}`);
    const detailResponse = await fetch(`/api/plant/details/${genus}`);
    const responseData: PlantCareResponse = await response.json();
    const detailData: PlantDetailsResponse = await detailResponse.json();
    setPlantCare(responseData.plantCare);
    setPlantDetails(detailData.plantDetails);
  }


  useEffect(() => {
    fetchPlantCareAndDetailsData();
  }, []);

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 content-center min-h-[calc(100vh-2rem)] my-16">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl py-1 text-center mb-2">
          {commonNames[0]}
        </h1>
        <h2 className="text-xl font-medium text-gray-700 text-center mt-2">
          Observed {date} at {notes[0].idPlace}
        </h2>

        <div className="flex justify-center my-4">
          <PlantImages images={cloudinaryImages} />
        </div>
        {<PlantCareChat plantCare={plantCare} plantDetails={plantDetails}/>}
      </section>
    </main>
  );
}

export default PlantCarePage;
