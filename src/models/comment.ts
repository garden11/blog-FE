// models
import { Post } from "./post";
import { ProfileView } from "./profile";
import { UserInfo } from "./user";

export type Comment = {
  id: string;
  postId: Post["id"];
  username: UserInfo["username"];
  content: string;
  registeredAt: string;
};

export type CommentView = {
  id: Comment["id"];
  postId: Comment["postId"];
  username: UserInfo["username"];
  content: Comment["content"];
  registeredAt: Comment["registeredAt"];
  profileId: ProfileView["id"];
  profileImageId: ProfileView["profileImageId"];
  profileImageUri: ProfileView["profileImageUri"];
};
