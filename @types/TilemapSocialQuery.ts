export interface TilemapSocialQuery { 
    sortby: TilemapSocialSortBy;
    order: TilemapSocialOrder;
    tags: string[];
    name: string;
}


export type TilemapSocialSortBy = "published" | "likes" | "dislikes" | "views";
export type TilemapSocialOrder = 1 | -1;