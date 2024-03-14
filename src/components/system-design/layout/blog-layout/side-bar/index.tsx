import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// api
import * as API from "src/api";

// components
import Profile from "./profile";
import Stack from "src/components/design-system/stack";

// hooks
import usePostActions from "src/hooks/usePostActions";

// types
import { ProfileDetail } from "src/types/profile";

// styles
import { spacing } from "src/styles/spacing";

type PageQuery = {
  username?: string;
};

type Props = {};

const SideBar = (props: Props) => {
  const router = useRouter();

  const { username } = router.query as PageQuery;

  const { handleClickCreatePostButton } = usePostActions();

  const [profile, setProfile] = useState<ProfileDetail>({} as ProfileDetail);

  useEffect(() => {
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

    getProfileDetail();
  }, [username]);

  return (
    <Stack.Vertical spacing={spacing.unit50}>
      <Profile
        profile={profile}
        onClickCreatePostButton={handleClickCreatePostButton}
      />
    </Stack.Vertical>
  );
};

export default SideBar;
