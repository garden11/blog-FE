import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

// componetns
import Button from "src/components/design-system/button";

// hooks
import useAuth from "src/hooks/useAuth";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { flex } from "src/styles/flex";
import { spacing } from "src/styles/spacing";

const Header = () => {
  const { data: session } = useSession();
  const { isSignedIn } = useAuth();

  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClickMyInfo = () => {
    if (!session) return;

    router.push(`/my-info`);
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
  const handleClickSignOutButton = () => {
    signOut();
  };
  const handleClickMyPostsButton = () => {
    if (!session) return;

    router.push(`/${session.username}`);
  };

  const styles = {
    container: css`
      position: fixed;
      z-index: 99999;
      width: 100%;
      height: 80px;
      top: 0px;
      background-color: #ffffff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);

      > .nav-bar {
        height: 100%;
        ${flex.display};
        ${flex.alignItems("center")};
        ${flex.justifyContent("center")};
        ${spacing.padding.x20};

        > .content {
          width: 100%;
          ${flex.display};
          ${flex.alignItems("center")};
          ${flex.justifyContent("space-between")};

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

          > .toggler {
            position: absolute;
            right: 30px;

            @media (min-width: 992px) {
              display: none;
            }
          }

          > .brand {
            float: left;
            color: #1e1e1e;
            font-size: 24px;
            font-weight: 900;

            > em {
              font-size: 24px;
              font-style: normal;
              color: #f48840;
            }
          }

          > .collapse {
            :not(.show) {
              display: none;
            }

            @media (min-width: 992px) {
              display: flex !important;
              ${flex.alignItems("center")};
            }

            > .nav {
              ${flex.display};
              ${flex.direction("row")};
              column-gap: ${coerceCssPixelValue(spacing.unit50)};

              > .item {
                ${flex.display};
                ${flex.alignItems("center")};
                ${flex.justifyContent("center")};
              }

              @media (max-width: 992px) {
                ${flex.direction("column")};
                row-gap: ${coerceCssPixelValue(spacing.unit20)};

                > .item {
                  ${spacing.padding.y10};
                }
              }
            }
          }
        }
      }

      #nav-bar-responsive {
        z-index: 999;

        @media (max-width: 992px) {
          z-index: 99999;
          position: absolute;
          top: 80px;
          left: 0px;
          width: 100%;
          text-align: center;
          background-color: #fff;
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        }
      }
    `,
  };

  return (
    <header css={styles.container}>
      <nav className={cx("nav-bar")}>
        <div className={cx("content")}>
          <div className={cx("brand")}>
            BLOG<em>.</em>
          </div>

          <div className={cx("toggler")}>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              width={"50px"}
              height={"46px"}
            >
              <MenuIcon />
            </Button>
          </div>
          <div
            className={cx("collapse", {
              show: isExpanded,
            })}
            id="nav-bar-responsive"
          >
            <ul className={cx("nav")}>
              {isSignedIn() ? (
                <>
                  <NavLink
                    value="MY POSTS"
                    onClick={handleClickMyPostsButton}
                  />
                  <NavLink value="MY INFO" onClick={handleClickMyInfo} />
                  <NavButton
                    value="SIGN OUT"
                    onClick={handleClickSignOutButton}
                  />
                </>
              ) : (
                <NavButton value="SIGN IN" onClick={handleClickSignInButton} />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavButton = (props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  value: string;
}) => {
  const { onClick, value } = props;

  return (
    <li className={cx("item")}>
      <Button onClick={onClick}>{value}</Button>
    </li>
  );
};

const NavLink = (props: {
  onClick: MouseEventHandler<HTMLAnchorElement>;
  value: string;
}) => {
  const { onClick, value } = props;

  const styles = {
    container: css`
      > .link {
        color: #1e1e1e;
        cursor: pointer;

        :hover {
          color: #f48840;
        }
      }
    `,
  };

  return (
    <li css={styles.container} className={cx("item")}>
      <a onClick={onClick} className={cx("link")}>
        {value}
      </a>
    </li>
  );
};

export default Header;
