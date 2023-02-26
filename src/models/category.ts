// models
import { UserInfo } from "./user";

export type Category = {
  id: string;
  username: UserInfo["username"];
  name: string;
};
