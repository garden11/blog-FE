import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// models
import { UserInfo } from "src/models/user";

// services
import PostService, { PostRequest } from "src/services/PostService";

// utils
import DateUtil from "src/utils/DateUtil";

type Params = {};

type Return = {
  handleClickCreatePostButton: () => void;
};

const usePost = (params?: Params): Return => {
  const { data: session } = useSession();
  const router = useRouter();

  const postService = new PostService();

  const dateUtil = new DateUtil();

  const handleClickCreatePostButton = () => {
    if (!session) return;

    (async () => {
      const request = {
        username: session.username,
        createdAt: dateUtil.createUtcUnixString(),
      } as PostRequest;

      const post = await postService.createPost({
        accessToken: session.accessToken,
        request,
      });

      post && router.push(`/${session.username}/post/${post.id}/edit`);
    })().catch((error) => alert("포스트 생성 중 에러가 발생하였습니다."));
  };

  return { handleClickCreatePostButton };
};

export default usePost;
