import { PerenualPlantListData } from "../types/types";
import { MongoDBCacheStore } from "../middleware/MongoDBCacheStore";
import { env } from "process";

const store = new MongoDBCacheStore(env.DB_STRING, "test", "cache");

async function getPlantSpeciesId(genus: string): Promise<number | undefined> {
  const speciesListApiUrl = `https://perenual.com/api/species-list?key=${env.PERENUAL_API_KEY}&page=1&q=${genus}`;

  const response = (await store.find(
    speciesListApiUrl,
  )) as PerenualPlantListData[];

  if (response) {
    return response[0].id;
  }
  return undefined;
}

export default getPlantSpeciesId;
