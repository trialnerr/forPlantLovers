import express from "express";
import plantController from "../controllers/plantController";

const plantRouter = express.Router();

plantRouter.post("/create", plantController.createPlant);
plantRouter.delete("/:plantId", plantController.deletePlant);
plantRouter.get("/allPlants/:id", plantController.getAllUserPlants);
plantRouter.get("/plantAndNotes/:userId", plantController.getAllPlantsAndNotes);
plantRouter.get("/care/:genus", plantController.getPlantCare); 
plantRouter.get("/details/:genus", plantController.getMorePlantDetails);

export default plantRouter;
