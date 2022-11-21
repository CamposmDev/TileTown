import SocialStatisticsPermissions from "./SocialStatisticsPermissions";

export default interface TilesetSocialStatistics {
    id: string;
    tileset: string;
    name: string;
    owner: string;
    tags: string[];
    description: string;
    community: string;
    likes: string[];
    dislikes: string[];
    views: number;
    permissions: SocialStatisticsPermissions[];
    comments: string[];
    publishDate: Date;
    imageURL: string;
}
