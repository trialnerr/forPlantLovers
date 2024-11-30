const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../controllers/imageController");
const apiReq = require("../apiTest");
const upload = multer({ dest: "uploads/" });

router.post(
  "/images",
  upload.array("image"),
  imageController.saveImage,
  async (req, res, next) => {
    try {
      const images = res.locals.images;
      const organTypes = req.body.organTypes.split(",");
      const { status, data } = await apiReq(organTypes, images);
      console.log("data", require("util").inspect(data, false, null, true));
      res.status(status).json({ data, images });
    } catch (error) {
      next({
        log: `error in api call, ${error}`,
        status: 500,
        message: { err: "An error occurred" },
      });
    }
  },
);

module.exports = router;

//save image to cloudinary then make call to API
//respond with what you get from API response
// app.post("/api/images", upload.array("image"), (req, res) => {
//   console.log('I made it');
//   console.log(req.body.organTypes.split(','));
//   console.log(req.files);

//   res.send('Yay');
//   //send the request to the backend
// })
