import mongoose from 'mongoose';
import { Contest } from "@types";
import { ContestDBM } from "../../interface";
import { ContestModel, TilemapSocialModel, TilesetSocialModel } from '../schemas';
import { ContestSchemaType } from '../types/index';

/**
 * @author Tuyen Vo, Peter Walsh
 */
export default class MongooseContestDBM implements ContestDBM {

    public async getContestById(contestId: string): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) { return null; }
        let contest = await ContestModel.findById(contestId);
        if (contest === null) { return null; }
        return this.parseContest(contest);
    }

    public async getContests(name: string, sort: string): Promise<Contest[]> {
        let currentDate = new Date()
        let filter: mongoose.FilterQuery<any> = {
            name: new RegExp(`^${name}`, 'i'),
            endDate: {$gte: currentDate}
        }
        let contests = []
        switch (sort) {
            case 'a-z':
                contests = await ContestModel.find(filter).sort({name: 1})
                break
            case 'z-a':
                contests = await ContestModel.find(filter).sort({name: -1})
                break
            case 'time_newest':
                contests = await ContestModel.find(filter).sort({startDate: -1})
                break
            case 'time_ending_soonest':
                contests = await ContestModel.find(filter).sort({endDate: 1})
                break
            case 'most_participates':
                contests = await ContestModel.find(filter).sort({participates: -1})
                break
            case 'least_participates':
                contests = await ContestModel.find(filter).sort({participates: 1})
                break
            default:
                contests = await ContestModel.find(filter);
        }
        return contests.map(c => this.parseContest(c));
    }

    public async getContestsById(contestIds: string[]): Promise<Contest[]> {
        if (!contestIds.every(id => mongoose.Types.ObjectId.isValid(id))) { return []; }
        let contests = await ContestModel.find({_id: { $in: contestIds }});
        return contests.map(contest=> this.parseContest(contest));
    }

    public async getContestByName(name: string): Promise<Contest | null> {
        let contest = await ContestModel.findOne({name: name});
        if (contest === null) { return null; }
        return this.parseContest(contest);
    }

    public async createContest(partial: Partial<Contest> & {owner: string, name: string}): Promise<Contest | null> {
        let type = partial.type
        if (type) {
            if (type.localeCompare('tilemap') !== 0 && type.localeCompare('tileset') !== 0) return null
        }
        if (!mongoose.Types.ObjectId.isValid(partial.owner)) { return null; }
        let contest = await ContestModel.create({...partial});
        let savedContest = await contest.save();
        return this.parseContest(savedContest);
    }

    public async updateContest(contestId: string, partial: Partial<Contest>): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) { return null; }
        let contest = await ContestModel.findById(contestId);
        if (contest === null) { return null; }
        this.fillContest(contest, partial);
        let savedContest = await contest.save();
        return this.parseContest(savedContest);
    }

    public async deleteContestById(contestId: string): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) { return null; }
        let contest = await ContestModel.findByIdAndDelete(contestId);
        if (contest === null) { return null; }
        return this.parseContest(contest);
    }

    /**
     * Checks if a contest is available by searching for one {type} of social document where the owner is {usrId} and contest is {contestId}
     * @param contestId 
     * @param type 'tilemap' | 'tileset' the type of contest
     * @param usrId 
     * @returns true if the the contest is available, otherwise false
     */
    public async isAvailable(contestId: string, type: string, usrId: string): Promise<boolean> {
        switch (type) {
            case 'tilemap':
                let tilemap = await TilemapSocialModel.findOne({owner: usrId, contest: contestId})
                /** If a tilemap exists, then the contest is not available */
                if (tilemap) return false
                break
            case 'tileset':
                let tileset = await TilesetSocialModel.findOne({owner: usrId, contest: contestId})
                /** If a tileset exists, then the contest is not available */
                if (tileset) return false
                break
        }
        return true
    }

    protected parseContest(contest: ContestSchemaType & { _id: mongoose.Types.ObjectId}): Contest { 
        return {
            id: contest._id.toString(),
            owner: contest.owner.toString(),
            name: contest.name,
            description: contest.description,
            participates: contest.participates.map((id) => id.toString()),
            startDate: contest.startDate,
            endDate: contest.endDate,
            type: contest.type,
            winner: contest.winner !== null ? contest.winner.toString() : "",
            isPublished: contest.isPublished
        };
    }
    protected fillContest(contest: ContestSchemaType & { _id: mongoose.Types.ObjectId}, partial: Partial<Contest>): void {
        contest.owner = partial.owner ? new mongoose.Types.ObjectId(partial.owner) : contest.owner;
        contest.name = partial.name ? partial.name : contest.name;
        contest.description = partial.description ? partial.description : contest.description;
        contest.participates = partial.participates ? partial.participates.map(id => new mongoose.Types.ObjectId(id)) : contest.participates;
        contest.startDate = partial.startDate ? partial.startDate : contest.startDate;
        contest.endDate = partial.endDate ? partial.endDate : contest.endDate;
        contest.type = partial.type ? partial.type : contest.type;
        contest.winner = partial.winner ? new mongoose.Types.ObjectId(partial.winner) : contest.winner;
        contest.isPublished = partial.isPublished ? partial.isPublished : contest.isPublished;
    }
}
