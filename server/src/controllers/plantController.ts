import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { CreatePlantBody, HttpCode } from "../types/types";
import { Plant } from "../models/Plant";
import { Types } from "mongoose";
import getPlantCareDetails from "../utils/getPlantCareDetails";
import getPlantSpeciesId from "../utils/getPlantSpecies";
import getPlantDetails from "../utils/getPlantDetails";

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

const deletePlant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { plantId } = req.params;
    await Plant.deleteOne({ _id: new Types.ObjectId(plantId) });
    res.status(200).send("Plant successfully deleted");
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

const getPlantCare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { genus } = req.params;
    const apiSpeciesId = await getPlantSpeciesId(genus);

    if (apiSpeciesId) {
      const plantCareRes = await getPlantCareDetails(apiSpeciesId);
      const plantCare = plantCareRes[0].section;
      res.status(200).json({ plantCare });
    } else {
      res.status(404).json({ message: "Species ID not found" });
    }
  } catch (error) {
    return next(error);
  }
};

const getMorePlantDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { genus } = req.params;
    const apiSpeciesId = await getPlantSpeciesId(genus);

    if (apiSpeciesId) {
      const plantDetails = await getPlantDetails(apiSpeciesId);
      res.status(200).json({ plantDetails });
    } else {
      res.status(404).json({ message: "Species ID not found" });
    }
  } catch (error) {
    return next(error);
  }
};
const plantController = {
  createPlant,
  getAllUserPlants,
  getAllPlantsAndNotes,
  deletePlant,
  getPlantCare,
  getMorePlantDetails
};

export default plantController;

// https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-lookup
