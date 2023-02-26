export type Profile = {
  id: string;
  username: string;
};

export type ProfileView = {
  id: Profile["id"];
  username: Profile["username"];
  profileImageId: ProfileImage["id"];
  profileImageUri: ProfileImage["uri"];
};

export type ProfileImage = {
  id: string;
  uri: string;
};
