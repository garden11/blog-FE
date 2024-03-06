import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// api
import * as API from "src/api";

// components
import Layout from "src/components/shared/Layout";
import ProfileArticle from "src/components/manage/ProfileArticle";
import CategoryArticle from "src/components/manage/CategoryArticle";

// types
import { ProfileDetail } from "src/types/profile";
import { Category } from "src/types/category";

// forms
import { CategoryFormValues } from "src/forms/categoryForm";
import { ImageFormValues } from "src/forms/imageForm";

// hooks
import useAuth from "src/hooks/useAuth";
import useAlertOrConfirm from "src/hooks/useAlertOrConfirm";

type PageQuery = {
  username?: string;
};

type Props = {};

const BlogManage = (props: Props) => {
  const { data: session } = useSession();
  const { alert, confirm } = useAlertOrConfirm();

  const [profile, setProfile] = useState<ProfileDetail>({} as ProfileDetail);
  const [categoryList, setCategoryList] = useState<Category[]>(
    [] as Category[]
  );

  useAuth({ shouldRedirect: true });

  useEffect(() => {
    const selectProfileDetail = async () => {
      if (!session) return;

      try {
        const profile = await API.selectProfileDetail({
          username: session.username,
        });
        profile && setProfile(profile);
      } catch (error) {
        alert("프로필 정보를 불러올 수 없습니다.");
      }
    };

    const selectCategoryList = async () => {
      if (!session) return;

      try {
        const categoryList = await API.selectCategoryList({
          username: session.username,
        });
        setCategoryList(categoryList);
      } catch (error) {
        alert("카테고리 목록을 불러올 수 없습니다.");
      }
    };

    selectProfileDetail();
    selectCategoryList();
  }, [session?.username]);

  const onSubmitProfileImageForm: SubmitHandler<ImageFormValues> = async (
    form,
    event
  ) => {
    if (!session) return;

    try {
      const request = {
        image: form.image,
        profileId: profile.id,
      } as API.ProfileImageRequest;

      const profileImage = await API.createProfileImage({
        accessToken: session.accessToken,
        request,
      });

      const newProfile: ProfileDetail = {
        ...profile,
        profileImageId: profileImage.id,
        profileImageUri: profileImage.uri,
      };

      setProfile(() => newProfile);

      event?.target.reset();

      alert("이미지가 변경되었습니다.");
    } catch (error) {
      alert("이미지 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitProfileImageForm: SubmitErrorHandler<ImageFormValues> = (
    errors
  ) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
  };

  const onSubmitCategoryForm: SubmitHandler<CategoryFormValues> = async (
    form,
    event
  ) => {
    try {
      if (!session) return;

      let category: Category;

      const request = {
        username: session.username,
        name: form.name,
      } as API.CategoryRequest;

      if (!form.id) {
        category = await API.createCategory({
          accessToken: session.accessToken,
          request,
        });
      } else {
        category = await API.updateCategory({
          accessToken: session.accessToken,
          id: form.id,
          request,
        });
      }

      const newCategoryList = [
        ...categoryList.filter((listItem) => listItem.id !== category.id),
        category,
      ];

      setCategoryList(newCategoryList);
      !form.id && event?.target.reset();
    } catch (error) {
      alert("카테고리 저장 중 에러가 발생하였습니다.");
    }
  };

  const onErrorSubmitCategoryForm: SubmitErrorHandler<CategoryFormValues> = (
    errors,
    event
  ) => {
    const errorList = Object.values(errors);
    errorList[0].message && alert(errorList[0].message);
    event?.target.reset();
  };

  const handleClickCategoryFormDeleteButton = async (id: Category["id"]) => {
    if (!session) return;

    if (confirm("카테고리를 삭제하시겠습니까?")) {
      try {
        await API.deleteCategory({
          accessToken: session?.accessToken,
          id,
        });

        const newCategoryList = categoryList.filter(
          (listItem) => listItem.id !== id
        );
        setCategoryList(newCategoryList);
      } catch (error) {
        alert("카테고리 삭제 중 에러가 발생하였습니다.");
      }
    }
  };

  return (
    <Layout>
      <div className="manage">
        <div className="col-lg-12">
          <div className="main-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mr-auto ml-auto">
                  <div className="main-box-items  profile mb-5">
                    <ProfileArticle
                      profile={profile}
                      onSubmitProfileImageForm={onSubmitProfileImageForm}
                      onErrorSubmitProfileImageForm={
                        onErrorSubmitProfileImageForm
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-8 mr-auto ml-auto">
                  <div className="main-box-items category">
                    <CategoryArticle
                      categoryList={categoryList}
                      onSubmitCategoryForm={onSubmitCategoryForm}
                      onErrorSubmitCategoryForm={onErrorSubmitCategoryForm}
                      onClickCategoryFormDeleteButton={
                        handleClickCategoryFormDeleteButton
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogManage;
