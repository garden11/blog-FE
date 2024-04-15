import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// apit
import * as API from "src/api";

// componetns
import Button from "src/components/design-system/button";
import Flex from "src/components/design-system/flex";
import ProfilePicture from "src/components/system-design/image/profile-picture";
import Menu from "./menu";

// constants
import { eventListeners } from "src/constants";

// hooks
import useAuth from "src/hooks/useAuth";

// styles
import { colors } from "src/styles/colors";
import { flex } from "src/styles/flex";
import { spacing } from "src/styles/spacing";

// types
import { ProfileDetail } from "src/types/profile";

const Header = () => {
  const { data: session } = useSession();
  const { isSignedIn } = useAuth();

  const scrollYRef = useRef<number>();

  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileDetail>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    loadProfileDetail();
  }, [!!session]);

  useEffect(() => {
    const handleProfileUpdateEvent = () => {
      loadProfileDetail();
    };

    window.addEventListener(
      eventListeners.PROFILE_UPDATE,
      handleProfileUpdateEvent
    );

    return () => {
      window.removeEventListener(
        eventListeners.PROFILE_UPDATE,
        handleProfileUpdateEvent
      );
    };
  }, []);

  useEffect(() => {
    scrollYRef.current = window.scrollY;

    console.log(scrollYRef.current);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollYRef.current === undefined) return;

      const isScrollingUp = scrollYRef.current > scrollY;

      setIsVisible(isScrollingUp);
      scrollYRef.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadProfileDetail = async () => {
    if (!session) return;

    const profile = await API.getProfileDetail({
      username: session.username,
    });

    profile && setProfile(profile);
  };

  const handleClickSignInButton = () => {
    const referer = router.asPath;

    router.push({
      pathname: "/sign-in",
      query: {
        referer: referer ?? "",
      },
    });
  };

  const styles = {
    container: css`
      position: fixed;
      z-index: 99999;
      width: 100%;
      height: 60px;
      top: 0px;
      background-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: top 0.4s ease-out;

      &.hidden {
        top: -60px;
        transition: top 0.4s ease-out;
      }

      > .nav-bar {
        height: 100%;
        ${flex.display};
        ${flex.alignItems("center")};
        ${flex.justifyContent("center")};
        ${spacing.padding.x20};

        > .content {
          @media (min-width: 576px) {
            max-width: 540px;
          }

          @media (min-width: 768px) {
            max-width: 720px;
          }

          @media (min-width: 992px) {
            max-width: 960px;
          }

          @media (min-width: 1200px) {
            max-width: 1140px;
          }

          > .brand {
            float: left;
            color: ${colors.heading};
            font-size: 24px;
            font-weight: 900;
            cursor: pointer;

            > em {
              font-size: 24px;
              font-style: normal;
            }
          }
        }
      }
    `,
  };

  return (
    <header
      css={styles.container}
      className={cx({
        hidden: !isVisible,
      })}
    >
      <nav className={cx("nav-bar")}>
        <Flex
          className={cx("content", "full-width")}
          alignItems="center"
          justifyContent="space-between"
        >
          <div className={cx("brand")} onClick={() => router.push("/")}>
            BLOG<em>.</em>
          </div>

          {isSignedIn() ? (
            <ProfilePicture
              size={"40px"}
              image={{ uri: profile?.profileImageUri }}
              onClick={(event) => {
                event.stopPropagation();

                setIsMenuOpen(!isMenuOpen);
              }}
            />
          ) : (
            <Button rounded onClick={handleClickSignInButton}>
              SIGN IN
            </Button>
          )}

          {isMenuOpen && (
            <Menu
              profile={profile}
              onClickOutSide={() => setIsMenuOpen(false)}
              onClickCloseButton={() => setIsMenuOpen(false)}
            />
          )}
        </Flex>
      </nav>
    </header>
  );
};

export default Header;
