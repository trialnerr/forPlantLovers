import { model, Schema, Types } from "mongoose";

export interface IPlantNote extends Document {
  postedBy: Types.ObjectId;
  plantID: Types.ObjectId;
  idDate: Date;
  idPlace: string;
  note: string;
}

const PlantNotesSchema = new Schema<IPlantNote>({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plantID: {
    type: Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  idDate: {
    type: Date,
    required: true,
  },
  idPlace: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

export const PlantNote = model<IPlantNote>("PlantNote", PlantNotesSchema);

//get all plant notes and associated users
//add a new plant note 
//update a plant note
//delete a plant note
//get all plant notes by user