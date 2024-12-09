import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import {
  CreatePlantBody,
  HttpCode,
  PerenualPlantCareData,
} from "../types/types";
import { Plant } from "../models/Plant";
import { Types } from "mongoose";
import { env } from "process";
import { MongoDBCacheStore } from "../middleware/MongoDBCacheStore";
const store = new MongoDBCacheStore(env.DB_STRING, "test", "cache");

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
    let { genus } = req.params;
    //query the db for the plant
    //get the genus of the plant
    //query the perenal api for the speciesID
    //using the speciesID get plant care tips
    //send back a response.
    // const plant = await Plant.find({ _id: plantId });
    // const genus = plant[0].genus;
    console.log({ genus }, "before");
    let splitGenus = genus.split(" ");
    if (splitGenus.includes("×")) {
      const indexOfX = splitGenus.indexOf("×");
      splitGenus = splitGenus.slice(0, indexOfX);
      genus = splitGenus.join(" ");
    }
    console.log({ genus }, "after");
    const speciesListApiUrl = `https://perenual.com/api/species-list?key=${env.PERENUAL_API_KEY}&page=1&q=${genus}`;

    const response = await store.find(speciesListApiUrl);
    console.log(response, 'response');
    let apiSpeciesId: number | undefined;

    if (response) {
      apiSpeciesId = response[0].id;
    }
    if (apiSpeciesId) {
      console.log({ apiSpeciesId });
      const plantCareApiUrl = `https://perenual.com/api/species-care-guide-list?key=${env.PERENUAL_API_KEY}&species_id=${apiSpeciesId}&page=1`;
      const plantCareRes = (await store.find(
        plantCareApiUrl,
      )) as PerenualPlantCareData[];
      const plantCare = plantCareRes[0].section;
      console.log(plantCare, "plantCare");
      res.status(200).json({ plantCare });
    } else {
      res.status(404).json({ message: "Species ID not found" });
    }
  } catch (error) {
    return next(
      // createServerError(
      //   "Something went wrong",
      //   HttpCode.INTERNAL_SERVER_ERROR,
      //   `Error getting plantCare details, ${error}`,
      // ),
      error,
    );
  }
};
const plantController = {
  createPlant,
  getAllUserPlants,
  getAllPlantsAndNotes,
  deletePlant,
  getPlantCare,
};

export default plantController;

// https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-lookup
