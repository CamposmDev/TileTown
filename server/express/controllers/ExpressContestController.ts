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
        res.status(200).json({message: "Updating a contest by id!"});
    }

    public async deleteContestById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting a contest by id!"});
    }

}