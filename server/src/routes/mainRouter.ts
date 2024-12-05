/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Request, Response, NextFunction } from "express";
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import multer from "multer";
import imageController from "../controllers/imageController";
import apiReq from "../apiTest";
import { ensureAuth } from "../middleware/auth";
import { HttpCode, ImageRequestBody, Images } from "../types/types";
import { createServerError } from "../utils/createServerError";

const upload = multer({ dest: "uploads/" });

router.post(
  "/images",
  ensureAuth,
  upload.array("image"),
  imageController.saveImage,
  async (
    req: Request<object, object, ImageRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const images: Images[] = res.locals.images as Images[];
      const organTypes: string[] = req.body.organTypes.split(",");
      const result = await apiReq(organTypes, images);
      if ("data" in result) {
        const { status, data } = result;
        res.status(status).json({ data, images });
      } else {
        next(result);
      }
    } catch (error) {
      next(
        createServerError(
          "An error occurred",
          HttpCode.INTERNAL_SERVER_ERROR,
          `error in /images route, ${error}`,
        ),
      );
    }
  },
);

export default router;
