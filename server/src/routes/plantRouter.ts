import express from "express";
import plantController from "../controllers/plantController";

const plantRouter = express.Router(); 

plantRouter.post(
  "/create",
  plantController.createPlant
);

export default plantRouter; 