import express from "express";
import plantController from "../controllers/plantController";

const plantRouter = express.Router();

plantRouter.post("/create", plantController.createPlant);
plantRouter.delete("/:plantId", plantController.deletePlant);
plantRouter.get("/allPlants/:id", plantController.getAllUserPlants);
plantRouter.get("/plantAndNotes/:userId", plantController.getAllPlantsAndNotes);

export default plantRouter;
