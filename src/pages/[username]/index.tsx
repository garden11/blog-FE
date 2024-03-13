import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import PostBoard from "src/components/system-design/post/post-board";

// types
import { Category } from "src/types/category";
import { PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";

// hooks
import useAuth from "src/hooks/useAuth";
import usePostActions from "src/hooks/usePostActions";

// types
import { Page } from "src/types/common";

type PageQuery = {
  username?: string;
  categoryId?: Category["id"] | undefined;
  page?: number | undefined;
};

type Props = {};

const BlogBoard: Page<Props> = (props) => {
  const router = useRouter();
  const { username, categoryId, page = 1 } = router.query as PageQuery;

  const { isSignedIn } = useAuth();
  const { handleClickCreatePostButton } = usePostActions();

  const [postList, setPostList] = useState<PostDetail[]>([] as PostDetail[]);
  const [postListPageInfo, setPostListPageInfo] = useState<PageInfo>(
    {} as PageInfo
  );

  useEffect(() => {
    const getPostDetailList = async () => {
      if (!username) return;

      try {
        const { content, ...pageInfo } = await API.getPostDetailList({
          username,
          categoryId,
          page,
        });

        setPostList(content);
        setPostListPageInfo(pageInfo);
      } catch (error) {
        alert("포스트를 불러올 수 없습니다.");
      }
    };

    getPostDetailList();
  }, [username, categoryId, page]);

  const handleClickPostBoardListItem = (postId: PostDetail["id"]) => {
    router.push(`/${username}/post/${postId}`);
  };

  const handleClickPostBoardPageNavigationButton = (page: number) => {
    router.push({
      pathname: `/${username}`,
      query: { page },
    });
  };

  return (
    <>
      <Head>
        <title>{username} 블로그</title>
      </Head>

      <PostBoard
        canPost={isSignedIn(username)}
        postList={postList}
        postListPageInfo={postListPageInfo}
        onClickPostListItem={handleClickPostBoardListItem}
        onClickPageNavigationButton={handleClickPostBoardPageNavigationButton}
        onClickCreatePostButton={handleClickCreatePostButton}
      />
    </>
  );
};

BlogBoard.layout = (page: ReactElement) => {
  return <BlogLayout>{page}</BlogLayout>;
};

export default BlogBoard;
