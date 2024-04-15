import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { htmlToText } from "html-to-text";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import BlogLayout from "src/components/system-design/layout/blog-layout";
import CommentBoard from "src/components/system-design/comment/comment-board";
import PostBox from "src/components/system-design/post/post-box";
import Stack from "src/components/design-system/stack";

// types
import { PostDetail } from "src/types/post";
import { UserInfo } from "src/types/user";
import { CommentDetail } from "src/types/comment";
import { PageInfo } from "src/types/pageInfo";

// forms
import { CommentFormValues } from "src/forms/commentForm";

// hooks
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// styles
import { spacing } from "src/styles/spacing";

// types
import { Page } from "src/types/common";

// utils
import DateUtil from "src/utils/DateUtil";

type PageQuery = {
  id?: PostDetail["id"];
  username?: UserInfo["username"];
};

type Props = {
  post: PostDetail;
};

const BlogPost: Page<Props> = (props: Props) => {
  const router = useRouter();

  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const dateUtil = new DateUtil();

  const { post } = props;
  const { username } = router.query as PageQuery;

  const [comments, setComments] = useState<CommentDetail[]>(
    [] as CommentDetail[]
  );
  const [commentsPageInfo, setCommentsPageInfo] = useState<PageInfo>(
    {} as PageInfo
  );
  const [commentBoardPage, setCommentBoardPage] = useState<number>(1);

  useEffect(() => {
    const loadCommentDetails = async () => {
      try {
        const { content, ...pageInfo } = await API.getCommentDetails({
          postId: post.id,
          page: commentBoardPage,
        });

        setComments(content);
        setCommentsPageInfo(pageInfo);
      } catch (error) {
        alert("댓글 불러오기 중 에러가 발생하였습니다.");
      }
    };

    loadCommentDetails();
  }, [post, commentBoardPage]);

  const handleClickUpdatePostButton = () => {
    router.replace(`/posts/${post.id}/edit`);
  };

  const handleClickDeletePostButton = async (postId: PostDetail["id"]) => {
    if (!session) return;

    if (confirm("포스트를 삭제하시겠습니까?")) {
      try {
        await API.deletePost({
          accessToken: session.accessToken,
          id: postId,
        });

        router.back();
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

      const { content, ...pageInfo } = await API.getCommentDetails({
        postId: post.id,
        page: commentBoardPage,
      });

      setComments(content);
      setCommentsPageInfo(pageInfo);

      event?.target.reset();
    } catch (error) {
      alert("댓글 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitCommentForm: SubmitErrorHandler<CommentFormValues> = (
    errors
  ) => {
    const { message } = Object.values(errors)[0];
    message && alert(message);
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
        const { content, ...pageInfo } = await API.getCommentDetails({
          postId: post.id,
          page: commentBoardPage,
        });

        setComments(content);
        setCommentsPageInfo(pageInfo);
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

      <Stack.Vertical spacing={spacing.unit30}>
        <PostBox
          post={post}
          onClickUpdatePostButton={handleClickUpdatePostButton}
          onClickDeletePostButton={handleClickDeletePostButton}
        />

        <CommentBoard
          comments={comments}
          commentsPageInfo={commentsPageInfo}
          onSubmitCommentForm={onSubmitCommentForm}
          onErrorSubmitCommentForm={onErrorSubmitCommentForm}
          onClickDeleteCommentButton={handleClickDeleteCommentButton}
          onClickPageNavigationButton={
            handleClickCommentBoardPageNavigationButton
          }
        />
      </Stack.Vertical>
    </>
  );
};

BlogPost.layout = (page: ReactElement) => {
  return <BlogLayout>{page}</BlogLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const { query } = context;
  const { id } = query as PageQuery;

  if (!id) return { notFound: true };

  const post = await API.getPostDetail({ id });

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
  };
};

export default BlogPost;
