// types
import { Post } from "./post";
import { ProfileDetail } from "./profile";
import { UserInfo } from "./user";

export type Comment = {
  id: string;
  postId: Post["id"];
  username: UserInfo["username"];
  content: string;
  registeredAt: string;
};

export type CommentDetail = {
  id: Comment["id"];
  postId: Comment["postId"];
  username: UserInfo["username"];
  content: Comment["content"];
  registeredAt: Comment["registeredAt"];
  profileId: ProfileDetail["id"];
  profileImageId: ProfileDetail["profileImageId"];
  profileImageUri: ProfileDetail["profileImageUri"];
};
