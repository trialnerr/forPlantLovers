import { PerenualPlantDetailsResponse } from "../types/types.js";
import { MongoDBCacheStore } from "../middleware/MongoDBCacheStore.js";
import { env } from "process";

const store = new MongoDBCacheStore(env.DB_STRING, "test", "cache");
async function getPlantDetails(speciesId: number) {
  const plantDetailsUrl =
    `https://perenual.com/api/species/details/${speciesId}?key=${env.PERENUAL_API_KEY}`;
  const response = await store.find(plantDetailsUrl) as PerenualPlantDetailsResponse;
  return response; 
}

export default getPlantDetails;
