export interface TilesetSocialQuery { 
    sortby: TilesetSocialSortBy;
    order: TilesetSocialOrder;
    tags: string[];
    name: string;
}


export type TilesetSocialSortBy = "published" | "likes" | "dislikes" | "views";
export type TilesetSocialOrder = 1 | -1;