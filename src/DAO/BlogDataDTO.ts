import { BlogType } from "./BlogType";

// BlogDataDTO Interface
export interface BlogDataDTO {
  blogType: BlogType; // Enum for blog type
  title: string; // Title of the blog
  slug: string; // Slug for the blog
  dateCreated: string | null; // ISO string for the creation date
  dateUpdated: string | null; // ISO string for the update date
  authorId: number; // Author ID
  content: string; // Blog content
  imageUrls: string[] | null; // Array of image URLs
  publishedStatus: boolean; // Publication status
}