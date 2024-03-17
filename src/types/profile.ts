export type Profile = {
  id: string;
  username: string;
};

export type ProfileDetail = {
  id: Profile["id"];
  username: Profile["username"];
  profileImageId: ProfileImage["id"];
  profileImageUri: ProfileImage["uri"];
};

export type ProfileImage = {
  id: string;
  uri: string;
};
