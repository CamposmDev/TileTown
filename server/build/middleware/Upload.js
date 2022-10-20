"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Our image upload service uses Multer to write files onto our server's
 * local file system.
 *
 * {@link https://www.npmjs.com/package/multer}
 */
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
/**
 * The StorageEngine object tells Multer where to write files to. The storage object
 * gets passed in as an option when multer is initialized.
 */
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, './public/uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
/**
 * The filter calllback function is used to filter files received by Multer. The function
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
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
/**
 * The Multer object
 */
const upload = (0, multer_1.default)({ storage: storage, fileFilter: filter });
exports.default = upload;
