/**
 * Our image upload service uses Multer to write files onto our server's
 * local file system.
 *
 * {@link https://www.npmjs.com/package/multer}
 */
import multer, { Multer, StorageEngine, FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

/**
 * The StorageEngine object tells Multer where to write files to. The storage object
 * gets passed in as an option when multer is initialized.
 */
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "images"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

/**
 * The filter callback function is used to filter files received by Multer. The function
 * gets passed in as an option when multer is initialized.
 *
 * @param req an express request object
 * @param file a multer file object. Contains metadata about the incoming file
 * @param cb a callback function. If the file should be accepted, cb should be called with
 * a boolean:
 *      cb(null, true) - accepts the file
 *      cb(null, false) - rejects the file
 *      cb(new Error(...)) - if an error occurs
 */
const filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/**
 * The Multer object
 */
const upload: Multer = multer({ storage: storage, fileFilter: filter });
export default upload;
