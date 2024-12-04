import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { CreatePlantBody, HttpCode } from "../types/types";
import { Plant } from "../models/Plant";

const createPlant = async (req: Request<object, object, CreatePlantBody>, res: Response, next: NextFunction) => {
  //save the plant to the db and sent back the id of the plant 
  
  try {
    const plant = await Plant.create(req.body);
    const plantId = plant._id; 
    res.status(200).json({ plantId }); 
    next();
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error creating new plant, ${error}`,
      ),
    );
  }
};

const plantController = {
  createPlant
}; 

export default plantController; 
