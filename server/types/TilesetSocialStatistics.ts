import SocialStatisticsPermissions from "./SocialStatisticsPermissions";

export default interface TilemapSocialStatistics {
  tileset: string;
  name: string;
  owner: string;
  ownerName: string;
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
