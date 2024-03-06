import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import Layout from "src/components/shared/Layout";
import SideBar from "src/components/shared/SideBar";
import PostBoard from "src/components/post/PostBoard";

// types
import { Category } from "src/types/category";
import { PostDetail } from "src/types/post";
import { PageInfo } from "src/types/pageInfo";

// hooks
import useAuth from "src/hooks/useAuth";
import usePostActions from "src/hooks/usePostActions";

type PageQuery = {
  username?: string;
  categoryId?: Category["id"] | undefined;
  page?: number | undefined;
};

type Props = {};

const BlogBoard = (props: Props) => {
  const router = useRouter();
  const { username, categoryId, page = 1 } = router.query as PageQuery;

  const { isSignedIn } = useAuth();
  const { handleClickCreatePostButton } = usePostActions();

  const [postList, setPostList] = useState<PostDetail[]>([] as PostDetail[]);
  const [postListPageInfo, setPostListPageInfo] = useState<PageInfo>(
    {} as PageInfo
  );

  useEffect(() => {
    const selectPostDetailList = async () => {
      if (!username) return;

      try {
        const { content, ...pageInfo } = await API.selectPostDetailList({
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

    selectPostDetailList();
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

      <Layout>
        <section className="blog-posts">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <PostBoard
                  canPost={isSignedIn(username)}
                  postList={postList}
                  postListPageInfo={postListPageInfo}
                  onClickPostListItem={handleClickPostBoardListItem}
                  onClickPageNavigationButton={
                    handleClickPostBoardPageNavigationButton
                  }
                  onClickCreatePostButton={handleClickCreatePostButton}
                />
              </div>
              <div className="col-lg-4">
                <SideBar username={username} categoryId={categoryId} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BlogBoard;
