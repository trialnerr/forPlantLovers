import { NextFunction, Request, Response } from "express";

export const ensureAuth =  function (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/login");
    }
  };

