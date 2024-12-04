import { Request } from "express";
import path from "path";
import multer, { FileFilterCallback} from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
//store files in upload
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, path.resolve("./upload/"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("Incorrect file type"));
  } else {
    cb(null, true);
  }
};

export default multer({ storage, fileFilter });

//https://stackoverflow.com/questions/59097119/using-multer-diskstorage-with-typescript