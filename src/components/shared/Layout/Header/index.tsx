import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

// hooks
import useAuth from "src/hooks/useAuth";

const Header = () => {
  const { data: session } = useSession();
  const { isSignedIn } = useAuth();

  const router = useRouter();

  const handleClickMyInfo = () => {
    if (!session) return;

    router.push(`/${session.username}/my-info`);
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
  const handleClickMyBlogButton = () => {
    if (!session) return;

    router.push(`/${session.username}`);
  };

  const NavButton = (props: {
    onClick: MouseEventHandler<HTMLButtonElement>;
    value: string;
  }) => {
    const { onClick, value } = props;

    return (
      <li className="nav-item">
        <button onClick={onClick} className="nab-button main-button">
          {value}
        </button>
      </li>
    );
  };

  const NavLink = (props: {
    onClick: MouseEventHandler<HTMLAnchorElement>;
    value: string;
  }) => {
    const { onClick, value } = props;

    return (
      <li className="nav-item">
        <a onClick={onClick} className="nav-link">
          {value}
        </a>
      </li>
    );
  };

  return (
    <header className="background-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand">
            <h2>
              BLOG<em>.</em>
            </h2>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav  ml-auto">
              {isSignedIn() ? (
                <>
                  <NavLink value="MY BLOG" onClick={handleClickMyBlogButton} />
                  <NavLink value="MY INFO" onClick={handleClickMyInfo} />
                  <NavButton
                    value="SIGN OUT"
                    onClick={handleClickSignOutButton}
                  />
                </>
              ) : (
                <>
                  <NavButton
                    value="SIGN IN"
                    onClick={handleClickSignInButton}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
