import { Request, Response } from 'express';
import { db } from "../../database";
import { Contest } from '@types';


export default class ContestController {

    public async getContestById(req: Request, res: Response): Promise<Response> {
        /** If there isn't an id in the url params return 400 - Bad Request */
        if (!req || !req.params) {
            return res.status(400).json({ message: "Bad Request!" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest id" });
        }

        /** If there isn't a contest in the database with the id return 404 - Not Found */
        let id: string = req.params.id
        let contest: Contest | null = await db.contests.getContestById(id);
        if (contest === null) {
            return res.status(404).json({ message: `Contest with id ${req.params.id} does not exist` });
        }

        /** Otherwise return all the data about the contest back to the client */
        return res.status(200).json({ message: "Got a contest!", contest: contest })
    }
    public async getContests(req: Request, res: Response): Promise<Response> {
        if (!req) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.query) {
            return res.status(400).json({ message: "Missing query options" });
        }

        let name = req.query.name ? req.query.name.toString() : "";
        let contests = await db.contests.getContests(name);
        if (contests.length === 0) {
            return res.status(404).json({ message: `No contests found with name "${name}"`});
        }

        return res.status(200).json({message: "Got contests!", contests: contests});
    }

    public async createContest(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.body) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id" });
        }
        if (!req.body.contest) {
            return res.status(400).json({ message: "Missing contest data in body" });
        }
        if (!req.body.contest.name) {
            return res.status(400).json({ message: "Contest must have a name field" });
        }

        // Check user exists
        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: "User not found" })
        }

        // Check if contest with name already exists
        let existingContest = await db.contests.getContestByName(req.body.contest.name);
        if (existingContest !== null) {
            return res.status(400).json({ message: `Contest already exists with name ${req.body.contest.name}` });
        }

        // Create the contest
        let contest = await db.contests.createContest({ owner: req.userId, ...req.body.contest });
        if (contest === null) {
            return res.status(500).json({ message: `Error creating contest` });
        }

        // Add contest to users joined contests
        user.joinedContests.push(contest.id);

        // Update the users joined contests
        let updatedUser = await db.users.updateUser(req.userId, { joinedContests: user.joinedContests });
        if (updatedUser === null) {
            return res.status(500).json({ message: `Error adding contest to users joined contests` });
        }

        // Return the new contest
        return res.status(201).json({ message: "Created a contest", contest: contest });
    }

    public async updateContestById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params || !req.body) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest id" });
        }
        if (!req.body.contest) {
            return res.status(400).json({ message: "Missing contest body" });
        }

        let contest = await db.contests.getContestById(req.params.id);
        if (contest === null) {
            return res.status(400).json({ message: `Contest with id ${req.params.id} not found` });
        }

        let updatedContest = await db.contests.updateContest(req.params.id, req.body.contest);
        if (updatedContest === null) {
            return res.status(500).json({ message: `Error updating contest with id ${req.params.id}` });
        }

        return res.status(200).json({ message: "Contest updated!", contest: contest });
    }

    public async deleteContestById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest id" });
        }

        let contest = await db.contests.getContestById(req.params.id);
        if (contest === null) {
            return res.status(404).json({ message: `Contest with id ${req.params.id} not found` })
        }

        let deletedContest = await db.contests.deleteContest(req.params.id);
        if (deletedContest === null) {
            return res.status(500).json({ message: `Contest with id ${req.params}` });
        }

        // Get the owner of the contest
        let user = await db.users.getUserById(deletedContest.owner)
        if (user === null) {
            return res.status(500).json({message: "Server Error. Failed to get owner of deleted contest"})
        }
        let idx = user.joinedContests.indexOf(deletedContest.id)
        if (idx !== -1) {
            user.joinedContests.splice(idx, 1)
            let updatedUser = await db.users.updateUser(user.id, {joinedContests: user.joinedContests})
            if (updatedUser === null) {
                return res.status(500).json({message: `Error updating owner ${user.id} in deleted contest`})
            }
        }

        return res.status(200).json({ message: "Deleted a contest!", contest: deletedContest });
    }

    public async joinContest(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id" });
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }
        let contest = await db.contests.getContestById(req.params.id);
        if (contest === null) {
            return res.status(404).json({ message: "Contest not found" });
        }

        let userIndex = contest.participates.indexOf(user.id);
        let contestIndex = user.joinedContests.indexOf(contest.id);
        if (userIndex > -1) {
            return res.status(400).json({ message: "User has already joined this contest" });
        }
        if (contestIndex > -1) {
            return res.status(400).json({ message: "User has already joined this contest" });
        }

        user.joinedContests.push(contest.id);
        contest.participates.push(user.id);

        let updatedUser = await db.users.updateUser(user.id, { joinedContests: user.joinedContests });
        if (updatedUser === null) {
            return res.status(500).json({ message: "Error adding contest to users joined contests" });
        }
        let updatedContest = await db.contests.updateContest(contest.id, { participates: contest.participates });
        if (updatedContest === null) {
            return res.status(500).json({ message: "Error adding user to participants in contest" });
        }

        return res.status(200).json({ message: "User joined a contest!", user: updatedUser, contest: updatedContest });
    }

    public async leaveContest(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest" });
        }
        if (!req.userId) {
            return res.status(400).json({ message: "Missing user id" });
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({ message: "User not found" });
        }
        let contest = await db.contests.getContestById(req.params.id);
        if (contest === null) {
            return res.status(404).json({ message: "Contest not found" });
        }

        let userIndex = contest.participates.indexOf(user.id);
        if (userIndex === -1) {
            return res.status(400).json({ message: "User has already left or is not in this contest" });
        }

        let contestIndex = user.joinedContests.indexOf(contest.id);
        if (contestIndex > -1) {
            return res.status(400).json({ message: "User has already left or is not in this contest" });
        }

        user.joinedContests.splice(contestIndex, 1);
        contest.participates.splice(userIndex, 1);

        let updatedUser = await db.users.updateUser(user.id, { joinedContests: user.joinedContests });
        if (updatedUser === null) {
            return res.status(500).json({ message: "Error removing contest from users joined contests" });
        }
        let updatedContest = await db.contests.updateContest(contest.id, { participates: contest.participates });
        if (updatedContest === null) {
            return res.status(500).json({ message: "Error removing user from participants in contest" });
        }

        return res.status(200).json({ message: "User left a contest!", user: updatedUser, contest: updatedContest });
    }
}