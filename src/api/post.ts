// lib
import appAxios from "src/lib/appAxios";

// types
import { Post, PostImage, PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";
import { UserInfo } from "src/types/user";
import { Tokens } from "src/types/auth";

// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// utils
import PageUtil from "src/utils/PageUtil";
import { Tag } from "src/types/tag";

export type PostRequest = {
  username: Post["username"];
  title: Post["title"];
  content: Post["content"];
  createdAt: string;
  registeredAt: string;
  updatedAt: string;
  imageUris: PostImage["uri"][];
};

export type PostImageRequest = {
  image: File;
  postId: PostImage["id"];
};

const pageUtil = new PageUtil();

export const getPost = async ({
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

export const getPostDetail = async ({
  id,
}: {
  id: PostDetail["id"];
}): Promise<PostDetail | null> => {
  const response = await appAxios().get(`/api/v1/post-detail/${id}`);

  return response.data;
};

export const getPostDetails = async ({
  page,
  username,
  tagId,
}: { page: number } & (
  | {
      username?: UserInfo["username"];
      tagId?: never;
    }
  | { username?: never; tagId?: Tag["id"] }
)): Promise<{ content: PostDetail[] } & PageInfo> => {
  const pageNumber = pageUtil.convertToNumberFromLabel(page);

  let uri: string = `/api/v1/post-details?page=${pageNumber}`;

  if (username) {
    uri = `/api/v1/user/${username}/post-details?page=${pageNumber}`;
  }

  if (tagId) {
    uri = `/api/v1/tag/${tagId}/post-details?page=${pageNumber}`;
  }

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
