import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export async function loadGalleryPlants() {
  const context = useContext(AuthContext);
  const userId = context?.user?._id;
  const response = await fetch(`/api/plant/plantAndNotes/${userId}`);
  return response.json();
}

export default async function fetchPlantData(userId: string){
  const response = await fetch(`/api/plant/plantAndNotes/${userId}`);
  return response.json();
}
