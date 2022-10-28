import SocialStatisticsPermissions from "./SocialStatisticsPermissions";

export default interface TilemapSocialStatistics {
    id: string;
  tileMap: string;
  name: string;
  owner: string;
  ownerName: string;
  collaborators: string[];
  collaboratorNames: string[];
  tags: string[];
  description: string;
  communities: string[];
  likes: string[];
  dislikes: string[];
  views: number;
  permissions: SocialStatisticsPermissions[];
  comments: string[];
  publishDate: Date;
  imageURL: string;
}
