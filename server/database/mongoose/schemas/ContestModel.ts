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
    description: { type: String, require: true, default: "Contest description!"},
    participates: { type: [ObjectId], require: true, default: []},
    startDate: { type: Date, require: true, default: new Date(Date.now() + 1000*60*5)},
    endDate: { type: Date, require: true, default: new Date(Date.now() + 1000*60*60*24)},
    type: { type: String, require: true, default: 'tilemap'},
    winner: { type: ObjectId, require: true, default: null},
    isPublished: { type: Boolean, require: true, default: false }
})

const ContestModel = mongoose.model('ContestSchema', ContestSchema)

export { ContestModel }