const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.Object

/**
 * @author Tuyen Vo
 */

const ContestSchema = new Schema({
    owner: { type: [ObjectId], require: true},
    name: { type: String, require: true},
    description: { type: String, require: true},
    startDate: { type: Date, require: true},
    endDate: { type: Date, require: true},
    winner: { type: ObjectId, require: true},
    isPunlished: { type: Boolean, require: true}
})
export {ContestSchema}