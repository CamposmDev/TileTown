import { Request, Response } from 'express';
import { db } from "../../database";
import { Contest } from '../../types';
import { is } from "typescript-is";


export default class ContestController {

    public async getContestById(req: Request, res: Response): Promise<Response> {
        /** If there isn't an id in the url params return 400 - Bad Request */
        if (!req || !req.params) {
            return res.status(400).json({ message: "Bad Request!" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest id"});
        }

        /** If there isn't a contest in the database with the id return 404 - Not Found */
        let id: string = req.params.id
        let contest: Contest | null = await db.contests.getContestById(id);
        if (contest === null) {
            return res.status(404).json({ message: `Contest with id ${req.params.id} does not exist`});
        }

        /** Otherwise return all the data about the contest back to the client */
        return res.status(200).json({ message: "Got a contest!", contest: contest })
    }

    public async createContest(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.body) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.userId) {
            return res.status(400).json({message: "Missing user id"});
        }
        if (!req.body.contest) {
            return res.status(400).json({ message: "Missing contest data in body"});
        }
        if (!req.body.contest.name) {
            return res.status(400).json({ message: "Contest must have a name field"});
        }

        // Check if contest with name already exists
        let existingContest = await db.contests.getContestByName(req.body.contest.name);
        if (existingContest !== null) {
            return res.status(400).json({message: `Contest already exists with name ${req.body.contest.name}`});
        }
        
        // Create the contest
        let contest = await db.contests.createContest({owner: req.userId, ...req.body.contest});
        if (contest === null) {
            return res.status(500).json({ message: `Error creating contest`});
        }

        return res.status(201).json({message: "Created a contest", contest: contest });
    }

    public async updateContestById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params || !req.body) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest id"});
        }
        if (!req.body.contest) {
            return res.status(400).json({ message: "Missing contest body"});
        }

        let contest = await db.contests.getContestById(req.params.id);
        if (contest === null) {
            return res.status(400).json({ message: `Contest with id ${req.params.id} not found` });
        }

        let updatedContest = await db.contests.updateContest(req.params.id, req.body.contest);
        if (updatedContest === null) {
            return res.status(500).json({ message: `Error updating contest with id ${req.params.id}`});
        }

        return res.status(200).json({ message: "Contest updated!", contest: contest });
    }

    public async deleteContestById(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.params) {
            return res.status(400).json({ message: "Bad Request" })
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contest id"});
        }

        let contest = await db.contests.getContestById(req.params.id);
        if (contest === null) { 
            return res.status(404).json({ message: `Contest with id ${req.params.id} not found`})
        }

        let deletedContest = await db.contests.deleteContest(req.params.id);
        if (deletedContest === null) {
            return res.status(500).json({ message: `Contest with id ${req.params}`});
        }
        
        return res.status(200).json({message: "Deleted a contest!", contest: deletedContest});
    }
    
}