// lib
import appAxios from "src/lib/appAxios";

// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// types
import { Category } from "src/types/category";
import { UserInfo } from "src/types/user";
import { Tokens } from "src/types/auth";

export type CategoryRequest = {
  username: Category["username"];
  name: Category["name"];
};

export const selectCategoryList = async ({
  username,
}: {
  username: UserInfo["username"];
}): Promise<Category[]> => {
  const response = await appAxios().get(`/api/v1/user/${username}/categories`);

  return response.data;
};

export const createCategory = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: CategoryRequest;
}): Promise<Category> => {
  const response = await appAxios().post("/api/v1/category", request, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const updateCategory = async ({
  accessToken,
  id,
  request,
}: {
  accessToken: Tokens["accessToken"];
  id: Category["id"];
  request: CategoryRequest;
}): Promise<Category> => {
  const response = await appAxios().put(`/api/v1/category/${id}`, request, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const deleteCategory = async ({
  accessToken,
  id,
}: {
  accessToken: Tokens["accessToken"];
  id: Category["id"];
}): Promise<Category> => {
  const response = await appAxios().delete(`/api/v1/category/${id}`, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};
