import { Request, Response } from 'express';
import { db } from "../../database";

export default class ContestController {

    public async getContestById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Getting a contest by id!"});
    }

    public async createContest(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Creating a contest!"});
    }

    public async updateContestById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Updating a contest by id!"});
    }

    public async deleteContestById(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: "Deleting a contest by id!"});
    }

}