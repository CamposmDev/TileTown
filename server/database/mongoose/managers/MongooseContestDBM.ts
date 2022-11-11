import mongoose from 'mongoose';
import { Contest } from "@types";
import { ContestDBM } from "../../interface";
import { ContestModel } from '../schemas';
import { ContestSchemaType } from '../types/index';

/**
 * @author Tuyen Vo, Peter Walsh
 */
export default class MongooseContestDBM implements ContestDBM {

    async getContestById(contestId: string): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) { return null; }
        let contest = await ContestModel.findById(contestId);
        if (contest === null) { return null; }
        return this.parseContest(contest);
    }
    async getContests(name: string): Promise<Contest[]> {
        let contests = await ContestModel.find({name: name});
        return contests.map(c => this.parseContest(c));
    }

    async getContestsById(contestIds: string[]): Promise<Contest[]> {
        if (!contestIds.every(id => mongoose.Types.ObjectId.isValid(id))) { return []; }
        let contests = await ContestModel.find({_id: { $in: contestIds }});
        return contests.map(contest=> this.parseContest(contest));
    }
    async getContestByName(name: string): Promise<Contest | null> {
        let contest = await ContestModel.findOne({name: name});
        if (contest === null) { return null; }
        return this.parseContest(contest);
    }
    async createContest(partial: Partial<Contest> & {owner: string, name: string}): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(partial.owner)) { return null; }

        let contest = await ContestModel.create({
            owner: partial.owner.toString(),
            name: partial.name,
            description: partial.description ? partial.description : "",
            participates: partial.participates ? partial.participates : [],
            startDate: partial.startDate ? partial.startDate : new Date(Date.now() + 900000),
            endDate: partial.endDate ? partial.endDate : new Date(Date.now() + 900000),
            winner: partial.winner ? partial.winner : null,
            isPublished: partial.isPublished ? partial.isPublished : false
        });
        let savedContest = await contest.save();
        return this.parseContest(savedContest);
    }
    async updateContest(contestId: string, partial: Partial<Contest>): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) { return null; }

        let contest = await ContestModel.findById(contestId)
        if (contest === null) { return null; }

        this.fillContest(contest, partial);
        let savedContest = await contest.save();
        return this.parseContest(savedContest);
        
    }
    async deleteContest(contestId: string): Promise<Contest | null> {
        if (!mongoose.Types.ObjectId.isValid(contestId)) { return null; }
        let contest = await ContestModel.findByIdAndDelete(contestId);
        if (contest === null) { return null; }
        return this.parseContest(contest);
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
        contest.winner = partial.winner ? new mongoose.Types.ObjectId(partial.winner) : contest.winner;
        contest.isPublished = partial.isPublished ? partial.isPublished : contest.isPublished;
    }
}
