import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { CreatePlantNoteBody, HttpCode } from "../types/types";
import { PlantNote } from "../models/PlantNote";

const createPlantNote = async (
  req: Request<object, object, CreatePlantNoteBody>,
  res: Response,
  next: NextFunction,
) => {
  //save the plantNote to the db and sent back the id of the plant

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

const deletePlantNote = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //save the plantNote to the db and sent back the id of the plant

  try {
    console.log(req.params.noteId);
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

const plantNoteController = {
  createPlantNote,
  deletePlantNote
};

export default plantNoteController;
