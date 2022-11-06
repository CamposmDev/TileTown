import { Response, Request } from "express";
import { TilemapSocialQuery, TilemapSocialOrder, TilemapSocialSortBy, TilesetSocialSortBy, TilesetSocialQuery, TilesetSocialOrder } from "@types";
import { db } from "../../database";

export default class ExpressQueryController {

    public async getUserContests(req: Request, res: Response): Promise<Response> {
        if (!req || !res) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.userId) {
            return res.status(400).json({message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User with id "${req.userId}" not found`});
        }

        let contests = await db.contests.getContestsById(user.joinedContests);
        if (contests.length === 0) {
            return res.status(404).json({message: "Contests not found"});
        }
        return res.status(200).json({message: "Got user contests", contests: contests});
    }
    public async getUserCommunities(req: Request, res: Response): Promise<Response> {
        if (!req || !res) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.userId) {
            return res.status(400).json({message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: "User not found"});
        }

        let communities = await db.communities.getCommunitiesById(user.joinedCommunities);
        if (communities.length === 0) {
            return res.status(404).json({message: "Communities not found"});
        }

        return res.status(200).json({message: "Got user communities!", communites: communities});
    }
    public async getUserTilemaps(req: Request, res: Response): Promise<Response> {
        if (!res || !req) {
            return res.status(400)
        }
        if (!req.userId) {
            return res.status(404)
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User ${req.userId} not found`});
        }
        let tilemaps = await db.tilemaps.getTilemapsById(user.tilemaps);
        if (tilemaps.length === 0) {
            return res.status(404).json({message: "No tilemaps found"});
        }
        return res.status(200).json({message: "Got user tilemaps", tilemaps: tilemaps});
    }
    public async getUserTilesets(req: Request, res: Response): Promise<Response> {
        if (!res || !req) {
            return res.status(400).json({message: "Bad Request"});
        }
        if (!req.userId) {
            return res.status(404).json({message: "Missing user id"});
        }

        let user = await db.users.getUserById(req.userId);
        if (user === null) {
            return res.status(404).json({message: `User ${req.userId} not found`});
        }
        let tilesets = await db.tilesets.getTilesetsById(user.tilesets);
        if (tilesets.length === 0) {
            return res.status(404).json({message: "No tilesets found"});
        }
        return res.status(200).json({message: "Got user tilesets", tilemaps: tilesets});
    }


    public async getTilemapSocials(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.query) {
            return res.status(400).json({message: "Bad Request"});
        }
        let params = TilemapSocialQueryParser.parse(req.query);
        let socials = await db.tilemapSocials.getTilemapSocials(params);
        return res.status(200).json({message: "Success", params: params, socials: socials});
    }
    public async getTilesetSocials(req: Request, res: Response): Promise<Response> {
        if (!req || !res || !req.query) {
            return res.status(400).json({message: "Bad Request"});
        }
        let params = TilesetSocialQueryParser.parse(req.query);
        let socials = await db.tilesetSocials.getTilesetSocials(params);
        return res.status(200).json({message: "Success", params: params, socials: socials});
    }

}

class TilemapSocialQueryParser {

    public static parse(params: Record<string, any>): TilemapSocialQuery {
        if (params === null || params === undefined) {
            return { sortby: "published", order: -1, tags: [], name: "" };
        }

        return {
            sortby: this.parseSocialSortByParam(params.sortby),
            order: this.parseSocialOrderParam(params.order),
            tags: this.parseSocialTagsParam(params.tags),
            name: params.name ? params.name : ""
        }
    }
    protected static parseSocialSortByParam(sortby: string): TilemapSocialSortBy {
        if (sortby === null || sortby === undefined) return "published";
        switch(sortby.toLowerCase()) { 
            case "likes": return "likes";
            case "dislikes": return "dislikes";
            case "views": return "views";
            case "published": return "published";
            default: return "published";
        }
    }
    protected static parseSocialOrderParam(order: string): TilemapSocialOrder {
        if (order === null || order === undefined || !parseInt(order)) return -1;
        switch(parseInt(order)) {
            case 1: return 1;
            case -1: return -1;
            default: return -1;
        }
    }
    protected static parseSocialTagsParam(tags: string): string[] {
        if (tags === null || tags === undefined) return [];
        return tags.trim().split(" ");
    }
}

class TilesetSocialQueryParser {
    public static parse(params: Record<string, any>): TilesetSocialQuery {
        if (params === null || params === undefined) {
            return { sortby: "published", order: -1, tags: [], name: "" };
        }

        return {
            sortby: this.parseSocialSortByParam(params.sortby),
            order: this.parseSocialOrderParam(params.order),
            tags: this.parseSocialTagsParam(params.tags),
            name: params.name ? params.name : ""
        }
    }
    protected static parseSocialSortByParam(sortby: string): TilesetSocialSortBy {
        if (sortby === null || sortby === undefined) return "published";
        switch(sortby.toLowerCase()) { 
            case "likes": return "likes";
            case "dislikes": return "dislikes";
            case "views": return "views";
            case "published": return "published";
            default: return "published";
        }
    }
    protected static parseSocialOrderParam(order: string): TilesetSocialOrder {
        if (order === null || order === undefined || !parseInt(order)) return -1;
        switch(parseInt(order)) {
            case 1: return 1;
            case -1: return -1;
            default: return -1;
        }
    }
    protected static parseSocialTagsParam(tags: string): string[] {
        if (tags === null || tags === undefined) return [];
        return tags.trim().split(" ");
    }
}