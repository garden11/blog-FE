import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { ValidationError } from "yup";
import { Editor } from "@tiptap/react";
import { parse } from "node-html-parser";
import _ from "lodash";

// api
import * as API from "src/api";

// hooks
import useAuth from "src/hooks/useAuth";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

// types
import { Post } from "src/types/post";
import { UserInfo } from "src/types/user";
import { Category } from "src/types/category";

// forms
import { PostFormValues } from "src/forms/postForm";

// auth
import { authOptions } from "src/pages/api/auth/[...nextauth]";

// components
import PostForm from "src/components/post/PostForm";
import { setTiptapEditorImage } from "src/components/Tiptap";

// utils
import DateUtil from "src/utils/DateUtil";
import ByteUtil from "src/utils/ByteUtil";

type PageQuery = {
  username?: UserInfo["username"];
  id?: Post["id"];
};

type Props = {
  post: Post;
};

const PostEdit = (props: Props) => {
  const { post } = props;

  const router = useRouter();

  const { data: session } = useSession();
  const { alert } = useAlertOrConfirm();

  const dateUtil = new DateUtil();
  const byteUtil = new ByteUtil();

  const [categoryList, setCategoryList] = useState<Category[]>(
    [] as Category[]
  );

  useAuth({ shouldRedirect: true });

  useEffect(() => {
    const getCategoryList = async () => {
      if (!session) return;

      try {
        const categoryList = await API.getCategoryList({
          username: session.username,
        });
        setCategoryList(categoryList);
      } catch (error) {
        alert("카테고리 목록을 불러올 수 없습니다.");
      }
    };

    getCategoryList();
  }, [session]);

  const onSubmitEditorImage = async (image: File, editor: Editor | null) => {
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

      setTiptapEditorImage({ uri: postImage.uri, editor });
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
        categoryId: form.categoryId,
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

      await API.updatePost({
        accessToken: session.accessToken,
        id: form.id,
        request: postRequest,
      });

      router.replace(`/${post.username}/post/${post.id}`);
    } catch (error) {
      alert("포스트 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitForm: SubmitErrorHandler<PostFormValues> = (errors) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  return (
    <div className="post-editor">
      <PostForm
        defaultValues={
          _.isEmpty(post)
            ? undefined
            : {
                id: post.id,
                categoryId: post.categoryId,
                title: post.title,
                content: post.content,
                contentByteLength: byteUtil.getByteLengthOfUtf8String(
                  post.content
                ),
                registerYN: post.registerYN,
              }
        }
        categoryList={categoryList}
        onSubmit={onSubmitForm}
        onErrorSubmit={onErrorSubmitForm}
        onSubmitImage={onSubmitEditorImage}
        onErrorSubmitImage={onErrorSubmitEditorImage}
      />
    </div>
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

  return {
    props: {
      post,
    },
  };
};

export default PostEdit;
