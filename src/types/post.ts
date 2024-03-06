import { Category } from "./category";
import { UserInfo } from "./user";

export type Post = {
  id: string;
  categoryId: Category["id"];
  username: UserInfo["username"];
  title: string;
  content: string;
  registeredAt: string;
  updatedAt: string;
  registerYN: "Y" | "N";
};

export type PostImage = {
  id: string;
  uri: string;
};

export type PostDetail = {
  id: Post["id"];
  username: Post["username"];
  categoryId: Post["categoryId"];
  categoryName: Category["name"];
  title: Post["title"];
  content: Post["content"];
  registeredAt: Post["registeredAt"];
  updatedAt: Post["updatedAt"];
  thumbnailImageId: PostImage["id"];
  thumbnailImageUri: PostImage["uri"];
};
