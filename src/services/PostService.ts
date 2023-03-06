// lib
import appAxios from "src/lib/appAxios";

// models
import { Post, PostImage, PostView } from "src/models/post";
import { PageInfo } from "src/models/pageInfo";
import { UserInfo } from "src/models/user";
import { Category } from "src/models/category";
import { Tokens } from "src/models/auth";

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
};

export type PostImageRequest = {
  image: File;
  postId: PostImage["id"];
  uriList: PostImage["uri"][];
};

export default class PostService {
  pageUtil = new PageUtil();

  selectPost = async ({
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

  createPost = async ({
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

  updatePost = async ({
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

  deletePost = async ({
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

  selectPostView = async ({
    id,
  }: {
    id: PostView["id"];
  }): Promise<PostView | null> => {
    const response = await appAxios().get(`/api/v1/post-view/${id}`);

    return response.data;
  };

  selectPostViewList = async ({
    username,
    categoryId,
    page,
  }: {
    username: UserInfo["username"];
    categoryId?: Category["id"];
    page: number;
  }): Promise<{ content: PostView[] } & PageInfo> => {
    const pageNumber = this.pageUtil.convertToNumberFromLabel(page);

    const uri = !categoryId
      ? `/api/v1/user/${username}/post-views?page=${pageNumber}`
      : `/api/v1/user/${username}/category/${categoryId}/post-views?page=${pageNumber}`;

    const response = await appAxios().get(uri);

    return response.data;
  };

  createPostImage = async ({
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

  updatePostImages = async ({
    accessToken,
    postId,
    request,
  }: {
    accessToken: Tokens["accessToken"];
    postId: Post["id"];
    request: PostImageRequest;
  }): Promise<void> => {
    const response = await appAxios().put(
      `/api/v1/post/${postId}/post-images`,
      request,
      {
        headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
      }
    );

    return response.data;
  };
}
