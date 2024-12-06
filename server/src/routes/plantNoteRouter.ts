import express from "express";
import plantNoteController from "../controllers/plantNoteController";


const plantNoteRouter = express.Router();

plantNoteRouter.post("/create", plantNoteController.createPlantNote);

plantNoteRouter.delete("/:noteId", plantNoteController.deletePlantNote); 


export default plantNoteRouter;
