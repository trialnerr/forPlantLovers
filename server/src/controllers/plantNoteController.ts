import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { CreatePlantNoteBody, HttpCode, UpdatePlantNoteBody } from "../types/types";
import { PlantNote } from "../models/PlantNote";
import { Types } from "mongoose";

const createPlantNote = async (
  req: Request<object, object, CreatePlantNoteBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const plantNote = await PlantNote.create(req.body);
    const plantNoteId = plantNote._id;
    res.status(200).json({ plantNoteId });
    next();
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error creating new plant Note, ${error}`,
      ),
    );
  }
};

const deletePlantNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { noteId } = req.params;
    await PlantNote.deleteOne({ _id: new Types.ObjectId(noteId) });
    res.status(200).send("Plant note successfully deleted");
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error deleting plant Note, ${error}`,
      ),
    );
  }
};

const updatePlantNote = async (
  req: Request<object,object,UpdatePlantNoteBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { note, idPlace, noteId } = req.body;
    const response = await PlantNote.updateOne(
      { _id: new Types.ObjectId(noteId) },
      { $set: { note, idPlace } },
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const plantNoteController = {
  createPlantNote,
  deletePlantNote,
  updatePlantNote
};

export default plantNoteController;
