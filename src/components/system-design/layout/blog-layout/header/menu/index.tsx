import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

// components
import Button from "src/components/design-system/button";
import Card from "src/components/design-system/card";
import Flex from "src/components/design-system/flex";
import Line from "src/components/design-system/line";
import Stack from "src/components/design-system/stack";
import ProfilePicture from "src/components/system-design/image/profile-picture";

// hooks
import usePostActions from "src/hooks/usePostActions";

//styles
import { spacing } from "src/styles/spacing";

// types
import { ProfileDetail } from "src/types/profile";

type Props = {
  profile: ProfileDetail | undefined;
  onClickOutSide: () => void;
  onClickCloseButton: () => void;
};

const Menu = (props: Props) => {
  const { data: session } = useSession();
  const { handleClickCreatePostButton } = usePostActions();

  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        props.onClickOutSide();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickMyPosts = () => {
    if (!session) return;

    router.push(`/users/${session.username}/posts`);
  };

  const handleClickMyInfo = () => {
    router.push("/my-info");
  };

  const handleClickSignOut = () => {
    signOut();
  };

  const styles = {
    container: css`
      position: fixed;
      top: 74px;
      right: 30px;
      width: 300px;

      .close-button {
        font-size: 34px;
        cursor: pointer;
        ${spacing.margin.right10};
      }

      .section {
        ${spacing.padding20};

        > .item {
          cursor: pointer;
        }
      }
    `,
  };

  return (
    <div css={styles.container} ref={ref}>
      <Card width={"100%"} variant="rounded">
        <Flex
          className={cx("close-button")}
          justifyContent="flex-end"
          onClick={props.onClickCloseButton}
        >
          ×
        </Flex>

        <div className={cx("section")}>
          {props.profile && (
            <Stack.Vertical spacing={spacing.unit10} alignItems="center">
              <Stack.Vertical spacing={spacing.unit4} alignItems="center">
                <ProfilePicture
                  image={{ uri: props.profile.profileImageUri }}
                  size={"50px"}
                />
                <div>{props.profile.username}</div>
              </Stack.Vertical>

              <Button
                rounded
                size="small"
                onClick={handleClickCreatePostButton}
              >
                작성하기
              </Button>
            </Stack.Vertical>
          )}
        </div>

        <Line.Horizontal />

        <Stack.Vertical className={cx("section")} spacing={spacing.unit10}>
          <div className={cx("item")} onClick={handleClickMyPosts}>
            내 포스트
          </div>

          <div className={cx("item")} onClick={handleClickMyInfo}>
            내 정보
          </div>
        </Stack.Vertical>

        <Line.Horizontal />

        <div className={cx("section")} onClick={handleClickMyInfo}>
          <div className={cx("item")} onClick={handleClickSignOut}>
            로그아웃
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Menu;
