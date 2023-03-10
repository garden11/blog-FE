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

// components
import Layout from "src/components/shared/Layout";
import SideBar from "src/components/shared/SideBar";
import CommentBoard from "src/components/comment/CommentBoard";
import PostBox from "src/components/post/PostBox";

// models
import { PostView } from "src/models/post";
import { UserInfo } from "src/models/user";
import { CommentView } from "src/models/comment";
import { PageInfo } from "src/models/pageInfo";
import { CommentFormValues } from "src/models/forms/commentForm";

// services
import PostService from "src/services/PostService";
import CommentService, { CommentRequest } from "src/services/CommentService";

// utils
import DateUtil from "src/utils/DateUtil";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

type PageQuery = {
  id?: PostView["id"];
  username?: UserInfo["username"];
};

type Props = {
  post: PostView;
};

const BlogPost = (props: Props) => {
  const router = useRouter();

  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const postService = new PostService();
  const commentService = new CommentService();

  const dateUtil = new DateUtil();

  const { post } = props;
  const { username } = router.query as PageQuery;

  const [commentList, setCommentList] = useState<CommentView[]>(
    [] as CommentView[]
  );
  const [commentListPageInfo, setCommentListPageInfo] = useState<PageInfo>(
    {} as PageInfo
  );
  const [commentBoardPage, setCommentBoardPage] = useState<number>(1);

  useEffect(() => {
    const selectCommentViewList = async () => {
      try {
        const { content, ...pageInfo } =
          await commentService.selectCommentViewList({
            postId: post.id,
            page: commentBoardPage,
          });

        setCommentList(content);
        setCommentListPageInfo(pageInfo);
      } catch (error) {
        alert("?????? ???????????? ??? ????????? ?????????????????????.");
      }
    };
  }, [post, commentBoardPage]);

  const handleClickUpdatePostButton = () => {
    router.replace(`/${username}/post/${post.id}/edit`);
  };

  const handleClickDeletePostButton = async (postId: PostView["id"]) => {
    if (!session) return;

    if (confirm("???????????? ?????????????????????????")) {
      try {
        await postService.deletePost({
          accessToken: session.accessToken,
          id: postId,
        });

        router.replace(`/${username}`);
      } catch (error) {
        alert("????????? ?????? ??? ????????? ?????????????????????.");
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
      } as CommentRequest;

      await commentService.createComment({
        accessToken: session.accessToken,
        request,
      });

      setCommentBoardPage(() => 1);

      const { content, ...pageInfo } =
        await commentService.selectCommentViewList({
          postId: post.id,
          page: commentBoardPage,
        });

      setCommentList(content);
      setCommentListPageInfo(pageInfo);

      event?.target.reset();
    } catch (error) {
      alert("?????? ?????? ??? ????????? ?????????????????????.");
    }
  };

  const onErrorSubmitCommentForm: SubmitErrorHandler<CommentFormValues> = (
    errors
  ) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  const handleClickDeleteCommentButton = async (
    commentId: CommentView["id"]
  ) => {
    if (!session) return;

    if (confirm("????????? ?????????????????????????")) {
      try {
        await commentService.deleteComment({
          accessToken: session.accessToken,
          id: commentId,
        });
        const { content, ...pageInfo } =
          await commentService.selectCommentViewList({
            postId: post.id,
            page: commentBoardPage,
          });

        setCommentList(content);
        setCommentListPageInfo(pageInfo);
      } catch (error) {
        alert("?????? ?????? ??? ????????? ?????????????????????.");
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
  const postService = new PostService();

  if (!id) return { notFound: true };

  const post = await postService.selectPostView({ id });

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
  };
};

export default BlogPost;
