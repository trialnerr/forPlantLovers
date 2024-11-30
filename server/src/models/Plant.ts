import { Document, model, Schema } from "mongoose";

export interface IPlant extends Document {
  commonNames: string[];
  scientificName: string;
  genus: string;
}

const PlantSchema = new Schema<IPlant>({
  commonNames: {
    type: [String], 
    required: true, 
  },
  scientificName: {
    type: String, 
    required: true, 
  },
  genus: {
    type: String, 
    required: true, 
  },
});

export const Plant = model<IPlant>("Plant", PlantSchema);

