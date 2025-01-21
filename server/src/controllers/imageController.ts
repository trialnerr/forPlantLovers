import { NextFunction, Request, Response } from "express";
import cloudinary from "../middleware/cloudinary.js";
import { HttpCode } from "../types/types.js";
import { createServerError } from "../utils/createServerError.js";
const saveImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uploadedImages = await Promise.all(
      (req.files as { path: string }[]).map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "plant_gallery",
        }),
      ),
    );
    const images = uploadedImages.map((upload) => ({
      url: upload.secure_url,
      public_id: upload.public_id,
    }));

    res.locals.images = images;
    return next();
  } catch (error) {
    next(createServerError('Error identifying image', HttpCode.INTERNAL_SERVER_ERROR, `Error caught in saveImage middleware ${error}`));
  }
};

export default { saveImage };
