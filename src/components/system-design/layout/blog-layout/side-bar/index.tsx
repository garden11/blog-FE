import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import CategoryMenu from "./category-menu";
import Profile from "./profile";
import Stack from "src/components/design-system/stack";

// hooks
import usePostActions from "src/hooks/usePostActions";

// types
import { Category } from "src/types/category";
import { ProfileDetail } from "src/types/profile";

// styles
import { spacing } from "src/styles/spacing";

type PageQuery = {
  username?: string;
  categoryId?: Category["id"] | undefined;
};

type Props = {};

const SideBar = (props: Props) => {
  const router = useRouter();

  const { username, categoryId } = router.query as PageQuery;

  const { handleClickCreatePostButton } = usePostActions();

  const [categoryList, setCategoryList] = useState<Category[]>(
    [] as Category[]
  );
  const [profile, setProfile] = useState<ProfileDetail>({} as ProfileDetail);

  useEffect(() => {
    const getCategoryList = async () => {
      if (!username) return;

      try {
        const categoryList = await API.getCategoryList({
          username,
        });
        setCategoryList(categoryList);
      } catch (error) {
        alert("카테고리 목록을 불러올 수 없습니다.");
      }
    };

    const getProfileDetail = async () => {
      if (!username) return;

      try {
        const profile = await API.getProfileDetail({
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

    getCategoryList();
    getProfileDetail();
  }, [username]);

  return (
    <Stack.Vertical spacing={spacing.unit50}>
      <Profile
        profile={profile}
        onClickCreatePostButton={handleClickCreatePostButton}
      />

      <CategoryMenu categoryList={categoryList} categoryId={categoryId} />
    </Stack.Vertical>
  );
};

export default SideBar;
