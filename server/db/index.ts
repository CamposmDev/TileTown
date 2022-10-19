import MongooseDBM from "./mongoose/MongooseDBM";
import TileTownDBM from "./interface/TileTownDBM";

const db: TileTownDBM = MongooseDBM.instance();

export { db };