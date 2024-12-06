import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { CreatePlantNoteBody, HttpCode } from "../types/types";
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

const plantNoteController = {
  createPlantNote,
  deletePlantNote,
};

export default plantNoteController;
