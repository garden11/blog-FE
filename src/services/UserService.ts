// lib
import appAxios from "src/lib/appAxios";

// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// types
import { Tokens } from "src/types/auth";
import { UserInfo } from "src/types/user";

export type UserRequest = {
  email: UserInfo["email"];
};

export default class UserService {
  selectUserInfo = async ({
    accessToken,
    username,
  }: {
    accessToken: Tokens["accessToken"];
    username: UserInfo["username"];
  }): Promise<UserInfo> => {
    const response = await appAxios().get(`/api/v1/user/${username}`, {
      headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
    });

    return response.data;
  };

  updateUser = async ({
    accessToken,
    username,
    request,
  }: {
    accessToken: Tokens["accessToken"];
    username: UserInfo["username"];
    request: UserRequest;
  }): Promise<UserInfo> => {
    const response = await appAxios().put(`/api/v1/user/${username}`, request, {
      headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
    });

    return response.data;
  };

  isUniqueUsername = async ({
    username,
  }: {
    username: string;
  }): Promise<boolean> => {
    const response = await appAxios().get(
      `/api/v1/user/${username}/check-username`
    );

    return response.data;
  };

  isUniqueEmail = async ({ email }: { email: string }): Promise<boolean> => {
    const response = await appAxios().get(`/api/v1/user/${email}/check-email`);

    return response.data;
  };
}
