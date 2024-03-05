// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// lib
import appAxios from "src/lib/appAxios";

// types
import { Profile, ProfileImage, ProfileView } from "src/types/profile";
import { UserInfo } from "src/types/user";
import { Tokens } from "src/types/auth";

export type ProfileImageRequest = {
  profileId: Profile["id"];
  image: File;
};

export default class ProfileService {
  selectProfileView = async ({
    username,
  }: {
    username: UserInfo["username"];
  }): Promise<ProfileView | null> => {
    const response = await appAxios().get(
      `/api/v1/user/${username}/profile-view`
    );

    return response.data;
  };

  createProfileImage = async ({
    accessToken,
    request,
  }: {
    accessToken: Tokens["accessToken"];
    request: ProfileImageRequest;
  }): Promise<ProfileImage> => {
    const formData = new FormData();
    formData.append("image", request.image);
    formData.append("profileId", request.profileId);

    const response = await appAxios().post("/api/v1/profile-image", formData, {
      headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
    });

    return response.data;
  };
}
