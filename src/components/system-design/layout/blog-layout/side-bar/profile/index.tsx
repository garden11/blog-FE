import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import Link from "next/link";

// components
import Button from "src/components/design-system/button";
import Card from "src/components/design-system/card";
import Flex from "src/components/design-system/flex";
import Line from "src/components/design-system/line";
import Spacing from "src/components/design-system/spacing";
import Stack from "src/components/design-system/stack";
import ProfilePicture from "src/components/system-design/image/profile-picture";

// hooks
import useAuth from "src/hooks/useAuth";

// styles
import { spacing } from "src/styles/spacing";

// types
import { ProfileDetail } from "src/types/profile";

type Props = {
  profile: ProfileDetail;
  onClickCreatePostButton: () => void;
};

const Profile = (props: Props) => {
  const { isSignedIn } = useAuth();

  const styles = {
    container: css`
      .username {
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 0.5px;
      }

      .manage {
        > .link {
          font-size: 15px;
          font-weight: 500;
          color: #20232e;

          :hover {
            color: #f48840;
          }

          .icon {
            ${spacing.margin.left4};
          }
        }
      }
    `,
  };

  return (
    <div css={styles.container}>
      <Card>
        <Card.Content padding="small">
          <Stack.Vertical spacing={spacing.unit10}>
            <ProfilePicture image={{ uri: props.profile.profileImageUri }} />

            <Flex.CenterHorizontal>
              <Link
                className={cx("username")}
                href={`/${props.profile.username}`}
              >
                {props.profile.username}
              </Link>
            </Flex.CenterHorizontal>
          </Stack.Vertical>

          <Spacing.Vertical size={spacing.unit10} />
          <Line.Horizontal />
          <Spacing.Vertical size={spacing.unit30} />

          {/*  블로그 사용자인 경우 포스트 버튼, 블로그 관리 버튼 추가 */}
          {isSignedIn(props.profile.username) && (
            <Stack.Vertical spacing={spacing.unit30}>
              <Flex.CenterHorizontal>
                <Button onClick={props.onClickCreatePostButton}>POST</Button>
              </Flex.CenterHorizontal>

              <Flex className={cx("manage")} justifyContent="flex-end">
                <Link
                  className={cx("link")}
                  href={`/${props.profile.username}/manage`}
                >
                  <Flex.CenterVertical>
                    <span>MANAGEMENT</span>
                    <img
                      className={cx("icon")}
                      src="/assets/images/settings-icon.png"
                    />
                  </Flex.CenterVertical>
                </Link>
              </Flex>
            </Stack.Vertical>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Profile;
