import { Document, model, Schema, Types } from "mongoose";

export interface IPlant extends Document {
  commonNames: string[];
  scientificName: string;
  genus: string;
  postedBy: Types.ObjectId; 
  apiImages: string[]; 
  cloudinaryImages: string[]; 
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
  apiImages: {
    type: [String], 
    required: true, 
  },
  postedBy: {
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
  },
  cloudinaryImages: {
    type: [String], 
    required: true, 
  },
  
});

export const Plant = model<IPlant>("Plant", PlantSchema);

//get all plants and associated users
//add a new plant 
//update a plant
//delete a plant
//get all plants by user
