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
            participates: contest.participates,
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
        if (!contest.name || !contest.owner) return null

      /**
       * Check the contest name is valid
       */
      const validContestName = async (contestName: string): Promise<boolean> => {
          const exitContest = await ContestSchema.findOne({name: contestName})
          return exitContest ? false : true
      }

      let contestName = contest.name
      if(!(await validContestName(contestName))) {
          console.log('not unique name')
          return null
      }
      
      let con: any = await ContestSchema.create({
          owner: contest.owner,
          name: contest.name,
          description: contest.description,
          startDate: contest.startDate,
          endDate: contest.endDate,
          isPublished: contest.isPublished
      })
      await con.save()
      return {
          id: con._id,
          owner: con.owner,
          name: con.name,
          description: con.description,
          participates: con.participates,
          startDate: con.startDate,
          endDate: con.endDate,
          winner: con.winner,
          isPublished: con.isPublished

        }
        
    }
    async updateContest(contestId: string, contest: Partial<Contest>): Promise<Contest | null> {
        let con: any = await ContestSchema.findById(contestId)
        if (con !== null) {
            if (contest.owner !== null) con.owner = contest.owner
            if (contest.name !== null) con.name = contest.name
            if (contest.description !== null) con.description = contest.description
            if (contest.participates !== null) con.participates = contest.participates
            if (contest.startDate !== null) con.startDate = contest.startDate
            if (contest.endDate !== null) con.endDate = contest.endDate
            if (contest.winner !== null) con.winner = contest.winner
            if (contest.isPublished !== null) con.isPublished = contest.isPublished
            await con.save()
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

    async deleteContest(contestId: string): Promise<boolean> {
        let con = await ContestSchema.findById(contestId)
        if (con !== null) {
            await con.delete()
            return true
        }
        return false
      }
}
