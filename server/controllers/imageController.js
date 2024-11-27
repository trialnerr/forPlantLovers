const cloudinary = require("../middleware/cloudinary");

const imageController = {}; 

imageController.saveImage = async (req, res, next) => {
    try {
      const uploadedImages = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "plant_gallery",
          }),
        ),
      );
      // Extract Cloudinary URLs
      const images = uploadedImages.map((upload) => ({
        url: upload.secure_url,
        public_id: upload.public_id, // Optional: Use for deletion if needed
      }));

      console.log({ images }); 
      // Respond with uploaded image URLs
      res.locals.images = images; 
      return next();
    } catch (error) {
      console.log('Error uploading images', err);
      next({
        log: `Error caught in saveImage middleware ${error}`,
        status: 500,
        message: { err: "Error saving images" },
      });
    }
}

module.exports = imageController;
