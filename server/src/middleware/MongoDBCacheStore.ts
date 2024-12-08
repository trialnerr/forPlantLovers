import axios from "axios";
import { MongoClient, Document, Collection } from "mongodb";
import { PerenualPlantCareData, PerenualPlantCareResponse, PerenualPlantListData, PerenualPlantListResponse, SetOptionsType } from "../types/types";

export class MongoDBCacheStore {
  uri: string;
  dbName: string;
  collectionName: string;
  client: MongoClient | null;
  collection: Collection<Document> | null;
  constructor(uri: string, dbName: string, collectionName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = null;
    this.collection = null;
  }

  async connect() {
    if (!this.client) {
      console.log("MongoStore.connect");
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.collection = this.client
        .db(this.dbName)
        .collection(this.collectionName);
    }
  }

  async find(key: string): Promise<PerenualPlantListData[] | PerenualPlantCareData[] | null> {
    console.log("MongoStore.find", key);
    await this.connect();
    const result = await this.collection?.findOne({ key });
    console.log({ result }, 'in MongoStore'); 
    if (result) {
      return result.value as
        | PerenualPlantListData[]
        | PerenualPlantCareData[];
    } else {
      const response = await axios.get<PerenualPlantCareResponse | PerenualPlantListResponse>(key);
      console.log("response", response);
      //check if the response is valid enough to save
      await this.set(key, response.data.data, {
        maxAge: 15 * 24 * 30 * 60 * 1000 * 60,
      });
      return response.data.data;
    }
  }

  
  async set(key:string, value, options: SetOptionsType) {
    console.log("MongoStore.set", key);
    await this.connect();
    const result = await this.collection?.updateOne(
      { key },
      { $set: { key, value, expiresAt: options.maxAge + Date.now() } },
      { upsert: true },
    );
    console.log("result", result);
  }

  async remove(key: string) {
    await this.connect();
    await this.collection?.deleteOne({ key });
  }

  async clear() {
    console.log("clear");
    await this.connect();
    await this.collection?.deleteMany({});
  }

  async close() {
    await this.connect();
    await this.client?.close();
  }
}
