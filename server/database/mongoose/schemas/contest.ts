import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

import ContestSchemaType from '../types/ContestSchemaType';

/**
 * @author Tuyen Vo
 */

const ContestSchema = new Schema<ContestSchemaType>({
    owner: { type: ObjectId, require: true},
    name: { type: String, require: true},
    description: { type: String, require: true},
    particpates: { type: [ObjectId], require: true },
    startDate: { type: Date, require: true},
    endDate: { type: Date, require: true},
    winner: { type: ObjectId, require: true},
    isPublished: { type: Boolean, require: true}
})
export = mongoose.model('ContestSchema', ContestSchema)