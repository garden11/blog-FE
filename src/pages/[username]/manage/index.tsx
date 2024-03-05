import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// components
import Layout from "src/components/shared/Layout";
import ProfileArticle from "src/components/manage/ProfileArticle";
import CategoryArticle from "src/components/manage/CategoryArticle";

// models
import { ProfileView } from "src/models/profile";
import { Category } from "src/models/category";

// forms
import { CategoryFormValues } from "src/forms/categoryForm";
import { ImageFormValues } from "src/forms/imageForm";

// services
import ProfileService, {
  ProfileImageRequest,
} from "src/services/ProfileService";
import CategoryService, { CategoryRequest } from "src/services/CategoryService";

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

  const profileService = new ProfileService();
  const categoryService = new CategoryService();

  const [profile, setProfile] = useState<ProfileView>({} as ProfileView);
  const [categoryList, setCategoryList] = useState<Category[]>(
    [] as Category[]
  );

  useAuth({ shouldRedirect: true });

  useEffect(() => {
    const selectProfileView = async () => {
      if (!session) return;

      try {
        const profile = await profileService.selectProfileView({
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
        const categoryList = await categoryService.selectCategoryList({
          username: session.username,
        });
        setCategoryList(categoryList);
      } catch (error) {
        alert("카테고리 목록을 불러올 수 없습니다.");
      }
    };

    selectProfileView();
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
      } as ProfileImageRequest;

      const profileImage = await profileService.createProfileImage({
        accessToken: session.accessToken,
        request,
      });

      const newProfile: ProfileView = {
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
      } as CategoryRequest;

      if (!form.id) {
        category = await categoryService.createCategory({
          accessToken: session.accessToken,
          request,
        });
      } else {
        category = await categoryService.updateCategory({
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
        await categoryService.deleteCategory({
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
