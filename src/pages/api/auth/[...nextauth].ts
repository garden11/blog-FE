import NextAuth, {
  NextAuthOptions,
  RequestInternal,
  Session,
  User,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

// api
import * as API from "src/api";

// utils
import DateUtil from "src/utils/DateUtil";

export const authOptions = (request?: NextApiRequest): NextAuthOptions => {
  const dateUtil = new DateUtil();

  const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { type: "text" },
          password: { type: "password" },
        },
        authorize: async (
          credentials: Record<string, string> | undefined,
          request: Pick<
            RequestInternal,
            "body" | "query" | "headers" | "method"
          >
        ): Promise<User | null> => {
          if (!credentials) return null;

          const { username, password } = credentials;

          const signInRequest: API.SignInRequest = {
            username,
            password,
          };

          const { userInfo, tokens } = await API.signIn({
            request: signInRequest,
          });

          return {
            id: userInfo.username,
            username: userInfo.username,
            role: userInfo.role,
            accessToken: tokens.accessToken,
            accessTokenExpiresAt: tokens.accessTokenExpiresAt,
            refreshToken: tokens.refreshToken,
          };
        },
      }),
    ],
    callbacks: {
      /**
       *  This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). The returned value will be encrypted, and it is stored in a cookie.
       */
      jwt: async ({
        token,
        user,
      }: {
        token: JWT;
        user?: User;
      }): Promise<JWT> => {
        if (user) {
          // This will only be executed at login. Each next invocation will skip this part.
          token = {
            username: user.username,
            role: user.role,
            accessToken: user.accessToken,
            accessTokenExpiresAt: user.accessTokenExpiresAt,
            refreshToken: user.refreshToken,
          };
        }

        const shouldReissueTokens =
          Number(token.accessTokenExpiresAt) -
            Number(dateUtil.createUtcUnixString()) <=
          0;

        if (shouldReissueTokens) {
          try {
            const reissueTokensRequest: API.ReissueTokensRequest = {
              refreshToken: token.refreshToken,
            };

            const reissuedTokens = await API.reissueTokens({
              accessToken: token.accessToken,
              request: reissueTokensRequest,
            });

            token = {
              ...token,
              accessToken: reissuedTokens.accessToken,
              accessTokenExpiresAt: reissuedTokens.accessTokenExpiresAt,
              refreshToken: reissuedTokens.refreshToken,
              error: undefined,
            };
          } catch (error) {
            token = { ...token, error: "RefreshAccessTokenError" };
          }
        }

        return token;
      },
      /**
       *  The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security.
       */
      session: async ({
        session,
        token,
      }: {
        session: Session;
        token: JWT;
      }): Promise<Session> => {
        session = {
          expires: session.expires,
          username: token.username,
          role: token.role,
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          error: token.error,
        };

        return session;
      },
    },
  };

  return authOptions;
};

export default (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, authOptions(request));
