import { createContext } from "react";

// types
import { ItemHeight, ItemWidth, LabelWidth, Variant } from "./types";

type Context = {
  variant: Variant;
  labelWidth: LabelWidth;
  itemWidth: ItemWidth;
  itemHeight: ItemHeight;
};

export const Context = createContext<Context>({
  variant: "vertical",
  labelWidth: "auto",
  itemWidth: "auto",
  itemHeight: "auto",
});
