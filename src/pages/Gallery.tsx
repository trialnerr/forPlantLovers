import { useContext, useEffect, useState } from "react";
import GalleryCard from "../components/GalleryCard";
import { AuthContext } from "../context/authContext";
import { PlantDataWithNotes } from "../types";

function Gallery() {
  const context = useContext(AuthContext);
  const userId = context?.user?._id;
  const [plantData, setPlantData] = useState<PlantDataWithNotes | null>(null);

  async function fetchPlantData(userId: string) {
    const response = await fetch(`/api/plant/plantAndNotes/${userId}`);
    const responseData = await response.json();
    setPlantData(responseData);
  }

  async function deletePlantAndNote(plantId: string, noteId: string) {
    await fetch(`/api/plant/${plantId}`, { method: "DELETE" });
    await fetch(`/api/plantNote/${noteId}`, { method: "DELETE" });

    if (userId) {
      fetchPlantData(userId);
    }
  }

  async function updateNote(noteId: string, note: string, idPlace: string) {
    await fetch(`/api/plantNote/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId, note, idPlace }),
    });
    if (userId) {
      fetchPlantData(userId);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchPlantData(userId);
    }
  }, [userId]);

  return (
    <main className="relative isolate px-6 pt-6 lg:px-8 content-center min-h-[calc(100vh-2rem)] bg-gray-100 p-9 my-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl py-1 text-center mb-2">
          Plant Gallery
        </h1>
        <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {plantData?.userPlantsWithNotes.map((plantWithNote, i) => (
            <GalleryCard
              plantWithNote={plantWithNote}
              key={`galleryCard${i}`}
              deletePlantAndNote={deletePlantAndNote}
              updateNote={updateNote}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Gallery;
