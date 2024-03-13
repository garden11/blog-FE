import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type Page<T = any> = NextPage<T> & {
  layout?: (page: ReactElement) => ReactNode;
};
