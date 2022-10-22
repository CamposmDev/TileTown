import SocailStatisticsPermissions from "./SocialStatisticsPermissions";

export default interface TilemapSocialStatistics {
    tileMap: string,
    name: string,
    owner: string,
    ownerName: string,
    collaborators: string[],
    collaboratorNames: string[],
    tags: string[],
    description: string,
    communites: string[],
    likes: string[],
    dislikes: string[],
    views: number,
    permissions: SocailStatisticsPermissions[],
    comments: string[],
    publishDate: Date,
    imageURL: string,
}