import { Request, Response } from 'express';
import { db } from "../../database/index";


export default class CommentController {

    public static async getCommentById(req: Request, res: Response): Promise<Response> {
        if (!req || !req.params) {
            return res.status(400).json({ message: "Bad Request" });
        }
        if(!req.params.id) {
            return res.status(400).json({ message: "Missing comment id" });
        }

        let comment = await db.comments.getCommentById(req.params.id);
        if (comment === null) { 
            return res.status(404).json({ message: "Comment not found" });
        }

        return res.status(200).json({ message: "Comment found!", comment: comment });
    }
}