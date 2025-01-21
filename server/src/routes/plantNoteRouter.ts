import express from "express";
import plantNoteController from "../controllers/plantNoteController.js";

const plantNoteRouter = express.Router();

plantNoteRouter.post("/create", plantNoteController.createPlantNote);
plantNoteRouter.delete("/:noteId", plantNoteController.deletePlantNote);
plantNoteRouter.patch("/update", plantNoteController.updatePlantNote);

export default plantNoteRouter;
