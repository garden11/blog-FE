// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

// lib
import appAxios from "src/lib/appAxios";

// types
import { Post } from "src/types/post";
import { Tag } from "src/types/tag";
import { Tokens } from "src/types/auth";

export type PostTagListRequest = {
  postId: string;
  tagList: string[];
};

export const getTagList = async ({
  postId,
}: {
  postId?: Post["id"];
}): Promise<Tag[]> => {
  const uri = postId ? `/api/v1/post/${postId}/tags` : `/api/v1/tags`;

  const response = await appAxios().get(uri);

  return response.data;
};

export const postTagList = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: PostTagListRequest;
}): Promise<void> => {
  await appAxios().post(`/api/v1/tags`, request, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });
};
