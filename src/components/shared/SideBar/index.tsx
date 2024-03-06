import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// api
import * as API from "src/api";

// hooks
import usePostActions from "src/hooks/usePostActions";

// types
import { Category } from "src/types/category";
import { ProfileDetail } from "src/types/profile";
import { UserInfo } from "src/types/user";

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

  const { handleClickCreatePostButton } = usePostActions();

  const [categoryList, setCategoryList] = useState<Category[]>(
    [] as Category[]
  );
  const [profile, setProfile] = useState<ProfileDetail>({} as ProfileDetail);

  useEffect(() => {
    const selectCategoryList = async () => {
      if (!username) return;

      try {
        const categoryList = await API.selectCategoryList({
          username,
        });
        setCategoryList(categoryList);
      } catch (error) {
        alert("카테고리 목록을 불러올 수 없습니다.");
      }
    };

    const selectProfileDetail = async () => {
      if (!username) return;

      try {
        const profile = await API.selectProfileDetail({
          username,
        });
        if (profile) {
          setProfile(profile);
        } else {
          alert("유효하지 않은 유저입니다.");
          router.replace("/404");
        }
      } catch (error) {
        alert("유저 정보를 불러올 수 없습니다.");
      }
    };

    selectCategoryList();
    selectProfileDetail();
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
