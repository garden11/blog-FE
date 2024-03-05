import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// types
import { UserInfo } from "src/types/user";

type Params = {
  shouldRedirect?: boolean;
  referer?: string;
};

type Return = {
  isSignedIn: (username?: UserInfo["username"]) => boolean;
};

const useAuth = (params?: Params): Return => {
  const { data: session } = useSession();
  const router = useRouter();

  const [hasSessionStarted, setHasSessionStarted] = useState(false);

  let shouldRedirect: boolean | undefined, referer: string | undefined;
  params && ({ shouldRedirect, referer } = params);

  useEffect(() => {
    if (session?.error) {
      signOut({ callbackUrl: "/sign-in", redirect: true });
    }
  }, [session]);

  useEffect(() => {
    if (session === null) {
      if (router.route !== "/sign-in") {
        shouldRedirect && router.replace("/sign-in");
      }
      setHasSessionStarted(false);
    } else if (session) {
      if (router.route === "/sign-in") {
        if (referer) {
          router.replace(`${referer}`);
        } else {
          router.replace(`/${session.username}`);
        }
      }
      setHasSessionStarted(true);
    }
  }, [session === null, !!session]);

  const isSignedIn = (username?: UserInfo["username"]): boolean => {
    if (!username) {
      return hasSessionStarted;
    } else {
      return hasSessionStarted && session?.username === username;
    }
  };

  return { isSignedIn };
};

export default useAuth;
