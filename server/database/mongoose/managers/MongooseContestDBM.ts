import { trusted } from "mongoose";
import { Contest } from "../../../types";
import { ContestDBM } from "../../interface";
import { ModeratorSchema, ContestSchema, UserSchema } from '../schemas';

/**
 * @author Tuyen Vo
 */

export default class MongooseContestDBM implements ContestDBM {

    async getContest(contestId: string): Promise<Contest | null> {
        let contest: any = await ContestSchema.findById({_id: contestId})
        return contest !== null ? {
            id: contest._id.toString(),
            owner: contest.owner.toString(),
            name: contest.name,
            description: contest.description,
            participates: contest.particpates,
            startDate: contest.startDate,
            endDate: contest.endDate,
            winner: contest.winner,
            isPublished: contest.isPublished
        } : null
    }
    async createContest(contest: Partial<Contest>): Promise<Contest | null> {
        /**
         * Check if the contest name or the contest owner not empty
         * If it is empty then return null
         */
        if (!contest.name || !contest.owner == null) return null

        /**
         * Check the contest name is valid
         */
        const validContestName = async (contestName: string): Promise<boolean> => {
            const exitContest = await ContestSchema.findOne({contestName: contestName})
            return exitContest ? false : true
        }
        let contestName = contest.name
        if(!(await validContestName(contestName))) return null
        return null
        
    }
    async updateContest(contestId: string, contest: Partial<Contest>): Promise<Contest | null> {
        let con: any = await ContestSchema.findById(contestId)
        if (con !== null) {
            con.contest = contest
            con.save()
            return {
                id: con._id.toString(),
                owner: con.owner.toString(),
                name: con.name,
                description: con.description,
                participates: con.particpates,
                startDate: con.startDate,
                endDate: con.endDate,
                winner: con.winner,
                isPublished: con.isPublished
            }
        }
        return null
    }
    
    async updateModerator(contestId: string, userId: string, role: string): Promise<string | null> {
        let con = await ContestSchema.findById(contestId)
        let user = await UserSchema.findById(userId)
        if (user !== null && con !== null) {
            let mod = await ModeratorSchema.findOne({groupId: con._id, userId: user._id})
            if (mod !== null) {
                mod.role = role
                await mod.save()
                return role
            }
        }
        return null
    }

    async deleteContest(contestId: string): Promise<string | null> {
        let con = await ContestSchema.findById(contestId)
        if (con !== null) {
            con.delete()
            return contestId
        }
        return null
    }

}