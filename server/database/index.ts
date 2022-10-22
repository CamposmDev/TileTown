import { MongooseDB } from "./mongoose";
import { TileTownDB } from "./interface";

const db: TileTownDB = new MongooseDB();

export { db };