import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// hooks
import usePost from "src/hooks/usePost";

// models
import { Category } from "src/models/category";
import { ProfileView } from "src/models/profile";
import { UserInfo } from "src/models/user";

// services
import CategoryService from "src/services/CategoryService";
import ProfileService from "src/services/ProfileService";

// components
import CategoryMenu from "./CategoryMenu";
import Profile from "./Profile";

type Props = {
  username?: UserInfo["username"];
  categoryId?: Category["id"];
};

const SideBar = (props: Props) => {
  const { username, categoryId } = props;

  const router = useRouter();

  const categoryService = new CategoryService();
  const profileService = new ProfileService();

  const { handleClickCreatePostButton } = usePost();

  const [categoryList, setCategoryList] = useState<Category[]>(
    [] as Category[]
  );
  const [profile, setProfile] = useState<ProfileView>({} as ProfileView);

  useEffect(() => {
    if (!username) return;

    (async () => {
      const categoryList = await categoryService.selectCategoryList({
        username,
      });
      setCategoryList(categoryList);
    })().catch((error) => "카테고리 목록을 불러올 수 없습니다.");

    (async () => {
      const profile = await profileService.selectProfileView({
        username,
      });
      if (profile) {
        setProfile(profile);
      } else {
        alert("유효하지 않은 유저입니다.");
        router.replace("/404");
      }
    })().catch((error) => alert("유저 정보를 불러올 수 없습니다."));
  }, [username]);

  return (
    <div className="sidebar">
      <div className="row">
        <div className="col-lg-12">
          <Profile
            profile={profile}
            onClickCreatePostButton={handleClickCreatePostButton}
          />
        </div>
        <div className="col-lg-12">
          <CategoryMenu categoryList={categoryList} categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
