//  constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// lib
import appAxios from "src/lib/appAxios";

// types
import { Tokens } from "src/types/auth";
import { UserInfo } from "src/types/user";

export type SignInRequest = {
  username: UserInfo["username"];
  password: string;
};

export type SignUpRequest = {
  email: UserInfo["email"];
  username: UserInfo["username"];
  password: string;
};

export type UpdatePasswordRequest = {
  username: UserInfo["username"];
  password: string;
  newPassword: string;
};

export type ResetPasswordRequest = {
  processToken: string;
  newPassword: string;
};

export type ReissueTokensRequest = {
  refreshToken: Tokens["refreshToken"];
};

export type MailRequest = {
  to: UserInfo["email"];
};

export const signIn = async ({
  request,
}: {
  request: SignInRequest;
}): Promise<{ userInfo: UserInfo; tokens: Tokens }> => {
  const response = await appAxios().post(`/api/v1/sign-in`, request);

  return response.data;
};

export const signUp = async ({
  request,
}: {
  request: SignUpRequest;
}): Promise<void> => {
  const response = await appAxios().post("/api/v1/sign-up", request);

  return response.data;
};

export const reissueTokens = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: ReissueTokensRequest;
}): Promise<Tokens> => {
  const response = await appAxios().post(`/api/v1/reissue-tokens`, request, {
    headers: {
      [AUTHORIZATION_HEADER_KEY]: accessToken,
    },
  });

  return response.data;
};

export const withdrawalUser = async ({
  accessToken,
  username,
}: {
  accessToken: Tokens["accessToken"];
  username: string;
}): Promise<void> => {
  const response = await appAxios().delete(
    `/api/v1/user/${username}/withdrawal`,
    {
      headers: {
        [AUTHORIZATION_HEADER_KEY]: accessToken,
      },
    }
  );

  return response.data;
};

export const updatePassword = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: UpdatePasswordRequest;
}): Promise<void> => {
  const response = await appAxios().post("/api/v1/update-password", request, {
    headers: {
      [AUTHORIZATION_HEADER_KEY]: accessToken,
    },
  });

  return response.data;
};

export const resetPassword = async ({
  request,
}: {
  request: ResetPasswordRequest;
}): Promise<void> => {
  const response = await appAxios().post("/api/v1/reset-password", request);

  return response.data;
};

export const sendResetPasswordMail = async ({
  request,
}: {
  request: MailRequest;
}) => {
  const response = await appAxios().post(
    "/api/v1/send-reset-password-mail",
    request
  );

  return response.data;
};
