import SocailStatisticsPermissions from "./SocialStatisticsPermissions";

export default interface TilemapSocialStatistics {
    tileset: string,
    name: string,
    ownerName: string,
    tags: string[]
    description: string,
    communities: string[],
    likes: string[],
    dislikes: string[],
    views: number,
    permissions: SocailStatisticsPermissions[],
    comments: string[]
    publishDate: Date,
    imageURL: string,
}