import { RequestHandler, NextFunction, Request, Response } from "express";
import Tileset from "../../../@types/Tileset";

export default class TilesetMW {

    public static createTileset(opts: Readonly<CreateTilesetOptions> = CreateTilesetDefault): RequestHandler {
        const handler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
            if (!req || !req.body) {
                return res.status(400).json({ message: "Bad Request"} );
            }
            if (!req.body.tileset) {
                return res.status(400).json({ message: "Missing tileset in request body"} );
            }

            console.log("Inside tileset middleware function!!!");

            /** Convert to JSON */
                
            try {
                req.body.tileset = JSON.parse(req.body.tileset);
            } catch {
                return res
                .status(400)
                .json({ message: "Tileset field is not valid JSON" });
            }

            let tileset: Tileset = req.body.tileset;

            /** Check for missing fields */

            if (tileset.name === undefined || tileset.name === null) {
                return res.status(400).json({ message: "Missing field 'name'"});
            }
            if (!tileset.rows === undefined || tileset.rows === null) {
                return res.status(400).json({ message: "Missing field 'rows'"});
            }
            if (!tileset.columns === undefined || tileset.columns === null) {
                return res.status(400).json({ message: "Missing field 'columns'"});
            }
            if (!tileset.tileHeight === undefined || tileset.tileHeight === null) {
                return res.status(400).json({ message: "Missing field 'tileHeight'"});
            }
            if (!tileset.imageWidth === undefined || tileset.imageWidth === null) {
                return res.status(400).json({ message: "Missing field 'imageWidth'"});
            }

            /** Check valid numbers */

            if (typeof tileset.rows !== "number") {
                return res.status(400).json({ message: "Rows is not a number"});
            }
            if (typeof tileset.columns !== "number") {
                return res.status(400).json({ message: "Columns is not a number"});
            }
            if (typeof tileset.tileHeight !== "number") {
                return res.status(400).json({ message: "Tile Height is not a number"});
            }
            if (typeof tileset.tileWidth !== "number") {
                return res.status(400).json({ message: "TileWidth is not a number"});
            }

            /** Floor the sizes */

            tileset.rows = Math.floor(tileset.rows);
            tileset.columns = Math.floor(tileset.columns);
            tileset.tileWidth = Math.floor(tileset.tileWidth);
            tileset.tileHeight = Math.floor(tileset.tileHeight);

            /** Check for lower limits */

            if (tileset.rows <= 0) {
                return res.status(400).json({ message: "Tileset must have at least one row" });
            }
            if (tileset.columns <= 0) {
                return res.status(400).json({ message: "Tileset must have at least one column" })
            }
            if (tileset.tileWidth <= 0) {
                return res.status(400).json({ message: "Tile width must be greater than 0" });
            }
            if (tileset.tileHeight <= 0) {
                return res.status(400).json({ message: "Tile height must be greater than 0" })
            }

            /** Check for upper limits */

            if (tileset.rows > opts.maxRows) {
                return res.status(400).json({ message: `Tileset must have fewer than ${opts.maxRows} rows`});
            }
            if (tileset.columns > opts.maxCols) {
                return res.status(400).json({ message: `Tileset must have fewer than ${opts.maxCols} columns`});
            }
            if (tileset.tileWidth > opts.maxTileWidth) {
                return res.status(400).json({ message: `Tileset tile width must be less than ${opts.maxTileWidth}`});
            }
            if (tileset.tileHeight > opts.maxTileHeight) {
                return res.status(400).json({ message: `Tileset tile height must be less than ${opts.maxTileHeight}`});
            }

            /** Go to the next function */
            next();
        }
        return handler;
    }

}


interface CreateTilesetOptions {
    maxRows: number;
    maxCols: number;
    maxTileWidth: number;
    maxTileHeight: number;
}

const CreateTilesetDefault: CreateTilesetOptions = {
    maxRows: 64,
    maxCols: 64,
    maxTileWidth: 100,
    maxTileHeight: 100,
}