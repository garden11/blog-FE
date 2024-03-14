import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// api
import * as API from "src/api";

// types
import { UserInfo } from "src/types/user";

// utils
import DateUtil from "src/utils/DateUtil";

type Params = {};

type Return = {
  handleClickCreatePostButton: () => void;
};

const usePostActions = (params?: Params): Return => {
  const { data: session } = useSession();
  const router = useRouter();

  const dateUtil = new DateUtil();

  const handleClickCreatePostButton = async () => {
    if (!session) return;

    try {
      const request = {
        username: session.username,
        createdAt: dateUtil.createUtcUnixString(),
      } as API.PostRequest;

      const post = await API.createPost({
        accessToken: session.accessToken,
        request,
      });

      post && router.push(`/post/${post.id}/edit`);
    } catch (error) {
      alert("포스트 생성 중 에러가 발생하였습니다.");
    }
  };

  return { handleClickCreatePostButton };
};

export default usePostActions;
