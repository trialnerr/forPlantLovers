import { useLocation } from "react-router-dom";
import { PlantCare, PlantCareResponse, PlantWithNote } from "../types";
import PlantCareChat from "../components/PlantCareChat";
import PlantImages from "../components/PlantCareDetailImages";
import { useEffect, useState } from "react";

function PlantCarePage() {
  const { state } = useLocation();
  const { plantWithNote } = state as { plantWithNote: PlantWithNote };
  const { cloudinaryImages, commonNames, notes, genus } = plantWithNote;
  const date = new Date(notes[0].idDate).toLocaleDateString();
  const [plantCare, setPlantCare] = useState<PlantCare[] | null>(null);

  console.log(plantCare, "plantCareData");

  async function fetchPlantCareData() {
    console.log('I ran')
    const response = await fetch(`/api/plant/care/${genus}`);
    const responseData: PlantCareResponse = await response.json();
    setPlantCare(responseData.plantCare);
  }

  useEffect(() => {
    fetchPlantCareData();
  }, []);

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 content-center min-h-[calc(100vh-2rem)]">
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
        {plantCare && <PlantCareChat plantCare={plantCare} />}
      </section>
    </main>
  );
}

export default PlantCarePage;
