// lib
import appAxios from "src/lib/appAxios";

// types
import { Comment, CommentDetail } from "src/types/comment";
import { PageInfo } from "src/types/pageInfo";
import { PostDetail } from "src/types/post";
import { Tokens } from "src/types/auth";

// utils
import PageUtil from "src/utils/PageUtil";

// constants
import { AUTHORIZATION_HEADER_KEY } from "src/constants";

export type CommentRequest = {
  username: Comment["username"];
  postId: Comment["postId"];
  content: Comment["content"];
  registeredAt: Comment["registeredAt"];
};

const pageUtil = new PageUtil();

export const getCommentDetailList = async ({
  postId,
  page,
}: {
  postId: PostDetail["id"];
  page: number;
}): Promise<{ content: CommentDetail[] } & PageInfo> => {
  const pageNumber = pageUtil.convertToNumberFromLabel(page);

  const response = await appAxios().get(
    `/api/v1/post/${postId}/comment-details?page=${pageNumber}`
  );

  return response.data;
};

export const createComment = async ({
  accessToken,
  request,
}: {
  accessToken: Tokens["accessToken"];
  request: CommentRequest;
}): Promise<Comment> => {
  const response = await appAxios().post("/api/v1/comment", request, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};

export const deleteComment = async ({
  accessToken,
  id,
}: {
  accessToken: Tokens["accessToken"];
  id: Comment["id"];
}): Promise<Comment> => {
  const response = await appAxios().delete(`/api/v1/comment/${id}`, {
    headers: { [AUTHORIZATION_HEADER_KEY]: accessToken },
  });

  return response.data;
};
