import { Request, Response } from 'express';
import { db } from "../../database";
import { Contest } from '../../types';

export default class ContestController {

    public async getContestById(req: Request, res: Response): Promise<void> {
         /** If there isn't an id in the url params return 400 - Bad Request */
         if (!req || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad Request!"})
            return
        }
        /** If there isn't a contest in the database with the id return 404 - Not Found */
        let id: string = req.params.id
        let contest: Contest | null = await db.contests.getContest(id)
        if (contest === null) {

            res.status(404).json({message: "Contest does not exist"})
            return
        }

        /** Otherwise return all the data about the contest back to the client */
        res.status(200).json({contest: contest})
        return
    }


    public async createContest(req: Request, res: Response): Promise<void> {
        if (!req || !req.body) {
            res.status(400).json({message: "Bad Request"})
            return
        }
        console.log(req.body)
        let contest: Contest | null = await db.contests.createContest({
            owner: req.body.owner,
            name: req.body.name,
            description: req.body.description,
            participates: req.body.particpates,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            winner: req.body.winner,
            isPublished: req.body.isPublished
        });

        if (contest === null) {
            res.status(400).json({message: "Bad Request"})
            return
        }
        res.status(201).json({contest: contest})
        return
    }

    public async updateContestById(req: Request, res: Response): Promise<void> {
         // If any data is missing - Bad request
         if (!req || !req.body || !req.params || !req.params.id) {
            res.status(400).json({message: "Bad Request"})
            return
        }
        // Update the contest 
        let id = req.params.id
        let payload: Partial<Contest> = {
            owner: req.body.owner,
            name: req.body.name,
            description: req.body.description,
            participates: req.body.particpates,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            winner: req.body.winner,
            isPublished: req.body.isPublished
        }
  
        let contest = db.contests.updateContest(id, payload)
        if (contest === null) {
            res.status(400).json({message: "Bad Request"});
            return;
        }
        
        res.status(201).json({contest: contest})
        return;
      }

    public async deleteContestById(req: Request, res: Response): Promise<void> {
        // If any data is missing - Bad request
        if (!req || !req.body) {
            res.status(400).json({message: "Bad Request"})
            return
        }      
        const contestId: string = req.body.contestId
        let isDeleted: boolean = await db.contests.deleteContest(contestId) 
        if (isDeleted) {
            res.status(200).json({message: 'Deleted contest id' + contestId})
            return
        }
        res.status(404).json({message: 'Contest does not exist'})
    }


}