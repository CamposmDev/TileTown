import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

/**
 * Data model for storing properties data
 * @author Andrew Ojeda
 * @
 */

const PropertiesSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Mixed, required: true },
});

exports = mongoose.model("Properties", PropertiesSchema);
