// lib
import appAxios from "src/lib/appAxios";

// types
import { Comment, CommentView } from "src/types/comment";
import { PageInfo } from "src/types/pageInfo";
import { PostView } from "src/types/post";
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

export default class CommentService {
  pageUtil = new PageUtil();

  selectCommentViewList = async ({
    postId,
    page,
  }: {
    postId: PostView["id"];
    page: number;
  }): Promise<{ content: CommentView[] } & PageInfo> => {
    const pageNumber = this.pageUtil.convertToNumberFromLabel(page);

    const response = await appAxios().get(
      `/api/v1/post/${postId}/comment-views?page=${pageNumber}`
    );

    return response.data;
  };

  createComment = async ({
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

  deleteComment = async ({
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
}
