// import { NextFunction, Request, Response } from "express";

// const createPlant = async(
//   req: Request<object, object, PlantRequestBody>,
//   res: Response,
//   next: NextFunction,
// ) => {
//   // try {
//   //   const { name, description, images } = req.body;
//   //   const plant = await Plant.create({ name, description, images });
//   //   res.status(HttpCode.CREATED).json(plant);
//   // } catch (error) {
//   //   return next(
//   //     createServerError(
//   //       "Something went wrong",
//   //       HttpCode.INTERNAL_SERVER_ERROR,
//   //       `Error creating new plant, ${error}`,
//   //     ),
//   //   );
//   // }
// }

// export default { createPlant };