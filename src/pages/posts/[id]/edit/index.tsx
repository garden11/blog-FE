import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getServerSession } from "next-auth";
import { ReactElement } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { ValidationError } from "yup";
import dynamic from "next/dynamic";
import { parse } from "node-html-parser";
import _ from "lodash";

// api
import * as API from "src/api";

// auth
import { authOptions } from "src/pages/api/auth/[...nextauth]";

// components
import EditorLayout from "src/components/system-design/layout/editor-layout";
import PostForm from "src/components/system-design/post/post-form";

// forms
import { PostFormValues } from "src/forms/postForm";

// hooks
import useAuth from "src/hooks/useAuth";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// types
import { Page } from "src/types/common";
import { Post } from "src/types/post";
import { Tag } from "src/types/tag";

// utils
import DateUtil from "src/utils/DateUtil";
import ByteUtil from "src/utils/ByteUtil";

type PageQuery = {
  id?: Post["id"];
};

type Props = {
  post: Post;
  tagList: Tag[];
};

const PostEdit: Page<Props> = (props) => {
  const { post } = props;

  const router = useRouter();

  const { data: session } = useSession();
  const { alert } = useAlertOrConfirm();

  const dateUtil = new DateUtil();
  const byteUtil = new ByteUtil();

  useAuth({ shouldRedirect: true });

  const onSubmitEditorImage = async (image: File) => {
    if (!session) return;

    try {
      const request = {
        image,
        postId: post.id,
      } as API.PostImageRequest;

      const postImage = await API.createPostImage({
        accessToken: session.accessToken,
        request,
      });

      return postImage.uri;
    } catch (error) {
      alert("이미지 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitEditorImage = (error: ValidationError) => {
    alert(error.message);
  };

  const onSubmitForm: SubmitHandler<PostFormValues> = async (form, event) => {
    if (!session) return;

    try {
      const postRequestDefault = {
        title: form.title,
        content: form.content,
        imageUriList: [] as API.PostRequest["imageUriList"],
      } as API.PostRequest;
      let postRequest: API.PostRequest;

      const imgNodeList = parse(form.content).querySelectorAll("img");
      let imageUriList = imgNodeList.map((listItem) =>
        listItem.getAttribute("src")
      );

      // undefined, 중복된 값 제거
      imageUriList = imageUriList.filter(
        (listItem, index) =>
          listItem && imageUriList.indexOf(listItem) === index
      );

      postRequestDefault.imageUriList = imageUriList as string[];

      if (form.registerYN === "Y") {
        postRequest = {
          ...postRequestDefault,
          updatedAt: dateUtil.createUtcUnixString(),
        };
      } else {
        postRequest = {
          ...postRequestDefault,
          registeredAt: dateUtil.createUtcUnixString(),
        };
      }

      const post = await API.updatePost({
        accessToken: session.accessToken,
        id: form.id,
        request: postRequest,
      });

      const postTagListRequest: API.PostTagListRequest = {
        postId: post.id,
        tagList: form.tagList,
      };

      await API.postTagList({
        accessToken: session.accessToken,
        request: postTagListRequest,
      });

      router.replace(`/posts/${post.id}`);
    } catch (error) {
      alert("포스트 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitForm: SubmitErrorHandler<PostFormValues> = (errors) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  return (
    <PostForm
      defaultValues={
        _.isEmpty(post)
          ? undefined
          : {
              id: post.id,
              title: post.title,
              content: post.content,
              contentByteLength: byteUtil.getByteLengthOfUtf8String(
                post.content
              ),
              tagList: props.tagList.map((tag) => tag.name),
              registerYN: post.registerYN,
            }
      }
      onSubmit={onSubmitForm}
      onErrorSubmit={onErrorSubmitForm}
      onSubmitImage={onSubmitEditorImage}
      onErrorSubmitImage={onErrorSubmitEditorImage}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const { query } = context;
  const { id } = query as PageQuery;
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions()
  );

  if (!session || !id) return { notFound: true };

  const post = await API.getPost({
    accessToken: session.accessToken,
    id,
  });

  if (!post) return { notFound: true };

  const tagList = await API.getTagList({
    postId: post.id,
  });

  return {
    props: {
      post,
      tagList,
    },
  };
};

PostEdit.layout = (page: ReactElement) => {
  return <EditorLayout>{page}</EditorLayout>;
};

export default PostEdit;
