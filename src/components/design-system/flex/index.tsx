import { css } from "@emotion/react";
import {
  CSSProperties,
  forwardRef,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

// styles
import { flex } from "src/styles/flex";

type OptionsDefault = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
};

type OptionsWithDirection = OptionsDefault & {
  direction?: "row" | "column";
};

type OptionsWithoutDirection = OptionsDefault & {
  direction?: never;
};

type Options = OptionsWithDirection | OptionsWithoutDirection;

type PropsDefault = {
  wrap?: CSSProperties["flexWrap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
} & ComponentPropsWithoutRef<"div">;

type PropsWithOptions<T extends Options> = {
  alignItems?: never;
  justifyContent?: never;
} & (T extends OptionsWithDirection
  ? { direction?: never }
  : { direction?: CSSProperties["flexDirection"] });

type PropsWithoutOptions = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  direction?: CSSProperties["flexDirection"];
};

type Props<T extends Options | undefined> = PropsDefault &
  (T extends Options ? PropsWithOptions<T> : PropsWithoutOptions);

type FlexComponent<T extends Options | undefined = undefined> =
  ForwardRefExoticComponent<
    PropsWithoutRef<Props<T>> & RefAttributes<HTMLDivElement>
  >;

const createFlexComponent = <T extends Options | undefined = undefined>(
  options: T
): FlexComponent<T> =>
  forwardRef<HTMLDivElement, Props<T>>(function FlexComponent(
    { wrap = "nowrap", rowGap = "normal", columnGap = "normal", ...props },
    ref: ComponentPropsWithRef<"div">["ref"]
  ) {
    const { direction, alignItems, justifyContent } = {
      direction: props.direction || options?.direction || "row",
      alignItems: props.alignItems || options?.alignItems || "stretch",
      justifyContent:
        props.justifyContent || options?.justifyContent || "flex-start",
    };

    const styles = {
      container: css`
        ${flex.display};
        ${flex.direction(direction)};
        ${flex.alignItems(alignItems)};
        ${flex.justifyContent(justifyContent)};
        ${flex.wrap(wrap)};
        ${flex.columnGap(columnGap)};
        ${flex.rowGap(rowGap)};
      `,
    };

    const {
      direction: _dirction,
      alignItems: _alignItems,
      justifyContent: _justifyContent,
      ...restProps
    } = props;

    return <div css={styles.container} ref={ref} {...restProps} />;
  });

type Flex = FlexComponent & {
  Center: FlexComponent<Options>;
  CenterVertical: FlexComponent<Options>;
  CenterHorizontal: FlexComponent<Options>;
};

const Flex: Flex = createFlexComponent(undefined) as Flex;
Flex.Center = createFlexComponent({
  alignItems: "center",
  justifyContent: "center",
});
Flex.CenterVertical = createFlexComponent({
  direction: "row",
  alignItems: "center",
});
Flex.CenterHorizontal = createFlexComponent({
  direction: "column",
  alignItems: "center",
});

export default Flex;
