import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { htmlToText } from "html-to-text";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import Layout from "src/components/shared/Layout";
import SideBar from "src/components/shared/SideBar";
import CommentBoard from "src/components/comment/CommentBoard";
import PostBox from "src/components/post/PostBox";

// types
import { PostDetail } from "src/types/post";
import { UserInfo } from "src/types/user";
import { CommentDetail } from "src/types/comment";
import { PageInfo } from "src/types/pageInfo";

// forms
import { CommentFormValues } from "src/forms/commentForm";

// utils
import DateUtil from "src/utils/DateUtil";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

type PageQuery = {
  id?: PostDetail["id"];
  username?: UserInfo["username"];
};

type Props = {
  post: PostDetail;
};

const BlogPost = (props: Props) => {
  const router = useRouter();

  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const dateUtil = new DateUtil();

  const { post } = props;
  const { username } = router.query as PageQuery;

  const [commentList, setCommentList] = useState<CommentDetail[]>(
    [] as CommentDetail[]
  );
  const [commentListPageInfo, setCommentListPageInfo] = useState<PageInfo>(
    {} as PageInfo
  );
  const [commentBoardPage, setCommentBoardPage] = useState<number>(1);

  useEffect(() => {
    const selectCommentDetailList = async () => {
      try {
        const { content, ...pageInfo } = await API.selectCommentDetailList({
          postId: post.id,
          page: commentBoardPage,
        });

        setCommentList(content);
        setCommentListPageInfo(pageInfo);
      } catch (error) {
        alert("댓글 불러오기 중 에러가 발생하였습니다.");
      }
    };
  }, [post, commentBoardPage]);

  const handleClickUpdatePostButton = () => {
    router.replace(`/${username}/post/${post.id}/edit`);
  };

  const handleClickDeletePostButton = async (postId: PostDetail["id"]) => {
    if (!session) return;

    if (confirm("포스트를 삭제하시겠습니까?")) {
      try {
        await API.deletePost({
          accessToken: session.accessToken,
          id: postId,
        });

        router.replace(`/${username}`);
      } catch (error) {
        alert("포스트 삭제 중 에러가 발생하였습니다.");
      }
    }
  };

  const onSubmitCommentForm: SubmitHandler<CommentFormValues> = async (
    form,
    event
  ) => {
    if (!session) return;

    try {
      const request = {
        username: session.username,
        postId: post.id,
        content: form.content,
        registeredAt: dateUtil.createUtcUnixString(),
      } as API.CommentRequest;

      await API.createComment({
        accessToken: session.accessToken,
        request,
      });

      setCommentBoardPage(() => 1);

      const { content, ...pageInfo } = await API.selectCommentDetailList({
        postId: post.id,
        page: commentBoardPage,
      });

      setCommentList(content);
      setCommentListPageInfo(pageInfo);

      event?.target.reset();
    } catch (error) {
      alert("댓글 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitCommentForm: SubmitErrorHandler<CommentFormValues> = (
    errors
  ) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  const handleClickDeleteCommentButton = async (
    commentId: CommentDetail["id"]
  ) => {
    if (!session) return;

    if (confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await API.deleteComment({
          accessToken: session.accessToken,
          id: commentId,
        });
        const { content, ...pageInfo } = await API.selectCommentDetailList({
          postId: post.id,
          page: commentBoardPage,
        });

        setCommentList(content);
        setCommentListPageInfo(pageInfo);
      } catch (error) {
        alert("댓글 삭제 중 에러가 발생하였습니다.");
      }
    }
  };

  const handleClickCommentBoardPageNavigationButton = (page: number) => {
    setCommentBoardPage(page);
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        {post?.content && (
          <meta name="description" content={htmlToText(post.content)} />
        )}
      </Head>

      <Layout>
        <section className="blog-posts grid-system">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12">
                    <PostBox
                      post={post}
                      onClickUpdatePostButton={handleClickUpdatePostButton}
                      onClickDeletePostButton={handleClickDeletePostButton}
                    />
                  </div>
                  <div className="col-lg-12">
                    <CommentBoard
                      commentList={commentList}
                      commentListPageInfo={commentListPageInfo}
                      onSubmitCommentForm={onSubmitCommentForm}
                      onErrorSubmitCommentForm={onErrorSubmitCommentForm}
                      onClickDeleteCommentButton={
                        handleClickDeleteCommentButton
                      }
                      onClickPageNavigationButton={
                        handleClickCommentBoardPageNavigationButton
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <SideBar
                  username={username}
                  categoryId={post?.categoryId ? post.categoryId : undefined}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const { query } = context;
  const { id } = query as PageQuery;

  if (!id) return { notFound: true };

  const post = await API.selectPostDetail({ id });

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
  };
};

export default BlogPost;
