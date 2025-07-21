import { Request } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

const getStorage = (filepath: string): StorageEngine => {
  return multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, path.join(__dirname, filepath));
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
};

export const uploadUserConfig = multer({ storage: getStorage("../../uploads/profile-pictures") }).single("profilePicture");
export const uploadTweetConfig = multer({ storage: getStorage("../../uploads/tweet-images") }).single("tweetPicture");
