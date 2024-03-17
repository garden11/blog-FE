// types
import type { CssPixelValue as Value } from "./types";

export const coerceCssPixelValue = (value: Value): string => {
  return typeof value === "number" ? `${value}px` : value;
};
export type CssPixelValue = Value;
