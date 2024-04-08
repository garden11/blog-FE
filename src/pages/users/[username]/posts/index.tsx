import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import PostBoard from "src/components/system-design/post/post-board";

// types
import { PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";

// hooks
import useAuth from "src/hooks/useAuth";
import usePostActions from "src/hooks/usePostActions";

// types
import { Page } from "src/types/common";

type PageQuery = {
  username?: string;
  page?: number | undefined;
};

type Props = {};

const UserBlogBoard: Page<Props> = (props) => {
  const router = useRouter();
  const { username, page = 1 } = router.query as PageQuery;

  const [posts, setPosts] = useState<PostDetail[]>([] as PostDetail[]);
  const [postsPageInfo, setPostsPageInfo] = useState<PageInfo>({} as PageInfo);

  useEffect(() => {
    const getPostDetails = async () => {
      if (!username) return;

      try {
        const { content, ...pageInfo } = await API.getPostDetails({
          username,
          page,
        });

        setPosts(content);
        setPostsPageInfo(pageInfo);
      } catch (error) {
        alert("포스트를 불러올 수 없습니다.");
      }
    };

    getPostDetails();
  }, [username, page]);

  const handleClickPostBoardListItem = (postId: PostDetail["id"]) => {
    router.push(`/posts/${postId}`);
  };

  const handleClickPostBoardPageButton = (page: number) => {
    router.push({
      pathname: `/users/${username}/posts`,
      query: { page },
    });
  };

  return (
    <>
      <Head>
        <title>{username} 블로그</title>
      </Head>

      <PostBoard
        posts={posts}
        postsPageInfo={postsPageInfo}
        onClickListItem={handleClickPostBoardListItem}
        onClickPageButton={handleClickPostBoardPageButton}
      />
    </>
  );
};

UserBlogBoard.layout = (page: ReactElement) => {
  return <BlogLayout>{page}</BlogLayout>;
};

export default UserBlogBoard;
