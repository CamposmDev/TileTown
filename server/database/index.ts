import MongooseDB from "./mongoose/MongooseDB";
import TileTownDB from "./interface/TileTownDB";

const db: TileTownDB = MongooseDB.instance();

export { db 