import { PerenualPlantCareData } from "../types/types.js";
import { MongoDBCacheStore } from "../middleware/MongoDBCacheStore.js";
import { env } from "process";

const store = new MongoDBCacheStore(env.DB_STRING, "test", "cache");
async function getPlantCareDetails(apiSpeciesId: number) {
  const plantCareApiUrl = `https://perenual.com/api/species-care-guide-list?key=${env.PERENUAL_API_KEY}&species_id=${apiSpeciesId}&page=1`;
  const plantCareData = await store.find(plantCareApiUrl) as PerenualPlantCareData[];
  return plantCareData;
}

export default getPlantCareDetails;
