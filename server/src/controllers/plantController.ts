import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { CreatePlantBody, HttpCode } from "../types/types";
import { Plant } from "../models/Plant";
import { Types } from "mongoose";

const createPlant = async (
  req: Request<object, object, CreatePlantBody>,
  res: Response,
  next: NextFunction,
) => {
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

const getAllUserPlants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const userPlants = await Plant.find({ postedBy: userId });
    res.status(200).json({ userPlants });
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error getting user's plants, ${error}`,
      ),
    );
  }
};

const getAllPlantsAndNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    console.log({ userId });
    const userPlantsWithNotes = await Plant.aggregate([
      { $match: { postedBy: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "plantnotes",
          localField: "_id",
          foreignField: "plantID",
          as: "notes",
        },
      },
    ]);
    res.status(200).json({ userPlantsWithNotes });
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error getting user's plants with notes, ${error}`,
      ),
    );
  }
};

const deletePlant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { plantId } = req.params; 
    await Plant.deleteOne({ _id: new Types.ObjectId(plantId) });
    res.status(200).send('Plant successfully deleted');
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error deleting plant, ${error}`,
      ),
    );
  }
};
const plantController = {
  createPlant,
  getAllUserPlants,
  getAllPlantsAndNotes,
  deletePlant
};

export default plantController;


// https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-lookup
