import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * next-auth의 커스텀 타입 정의
 */

export interface UserInfo {
  username: string;
  role: string;
}

export interface Tokens {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username: UserInfo["username"];
    role: UserInfo["role"];
    accessToken: Tokens["accessToken"];
    accessTokenExpiresAt: Tokens["accessTokenExpiresAt"];
    refreshToken: Tokens["refreshToken"];
    error?: string;
  }
}

declare module "next-auth" {
  interface User {
    id: UserInfo["username"];
    username: UserInfo["username"];
    role: UserInfo["role"];
    accessToken: Tokens["accessToken"];
    accessTokenExpiresAt: Tokens["accessTokenExpiresAt"];
    refreshToken: Tokens["refreshToken"];
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    username: UserInfo["username"];
    role: UserInfo["role"];
    accessToken: Tokens["accessToken"];
    accessTokenExpiresAt: Tokens["accessTokenExpiresAt"];
    error?: string;
  }
}
