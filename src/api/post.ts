// lib
import appAxios from "src/lib/appAxios";

// types
import { Post, PostImage, PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";
import { UserInfo } from "src/types/user";
import { Category } from "src/types/category";
import { Tokens } from "src/types/auth";

// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// utils
import PageUtil from "src/utils/PageUtil";

export type PostRequest = {
  username: Post["username"];
  categoryId: Post["categoryId"];
  title: Post["title"];
  content: Post["content"];
  createdAt: string;
  registeredAt: string;
  updatedAt: string;
  imageUriList: PostImage["uri"][];
};

export type PostImageRequest = {
  image: File;
  postId: PostImage["id"];
};

const pageUtil = new PageUtil();

export const selectPost = async ({
  accessToken,
  id,
}: {
  accessToken: Tokens["accessToken"];
  id: Post["id"];
}): Promise<Post | null> => {
  const response = await appAxios().get(`/api/v1/post/${id}`, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const createPost = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: PostRequest;
}): Promise<Post> => {
  const response = await appAxios().post("/api/v1/post", request, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const updatePost = async ({
  accessToken,
  id,
  request,
}: {
  accessToken: Tokens["accessToken"];
  id: Post["id"];
  request: PostRequest;
}): Promise<Post> => {
  const response = await appAxios().put(`/api/v1/post/${id}`, request, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const deletePost = async ({
  accessToken,
  id,
}: {
  accessToken: Tokens["accessToken"];
  id: Post["id"];
}): Promise<Post> => {
  const response = await appAxios().delete(`/api/v1/post/${id}`, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const selectPostDetail = async ({
  id,
}: {
  id: PostDetail["id"];
}): Promise<PostDetail | null> => {
  const response = await appAxios().get(`/api/v1/post-detail/${id}`);

  return response.data;
};

export const selectPostDetailList = async ({
  username,
  categoryId,
  page,
}: {
  username: UserInfo["username"];
  categoryId?: Category["id"];
  page: number;
}): Promise<{ content: PostDetail[] } & PageInfo> => {
  const pageNumber = pageUtil.convertToNumberFromLabel(page);

  const uri = !categoryId
    ? `/api/v1/user/${username}/post-details?page=${pageNumber}`
    : `/api/v1/user/${username}/category/${categoryId}/post-details?page=${pageNumber}`;

  const response = await appAxios().get(uri);

  return response.data;
};

export const createPostImage = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: PostImageRequest;
}): Promise<PostImage> => {
  const formData = new FormData();
  formData.append("image", request.image);
  formData.append("postId", request.postId);

  const response = await appAxios().post("/api/v1/post-image", formData, {
    headers: {
      [AUTHORIZATION_HEADER_KEY]: accessToken,
    },
  });

  return response.data;
};
