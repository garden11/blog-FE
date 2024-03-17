import {
  CSSProperties,
  forwardRef,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from "react";
import { css } from "@emotion/react";

// components
import Flex from "../flex";
import Item from "./item";

// styles
import { gutter } from "src/styles/gutter";

type Options = {
  direction: "vertical" | "horizontal";
};

type Props = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  selector?: string;
  spacing?: number;
} & ComponentPropsWithoutRef<"div">;

type StackComponent = (
  props: Props & Partial<Pick<ComponentPropsWithRef<"div">, "ref">>
) => JSX.Element | null;

const createStackComponent = (options: Options): StackComponent =>
  forwardRef(function StackComponent(
    { alignItems = "stretch", justifyContent = "flex-start", ...props }: Props,
    ref: ComponentPropsWithRef<"div">["ref"]
  ) {
    const { direction = "horizontal" } = options;

    const styles = {
      container: css`
        ${props.spacing &&
        direction === "vertical" &&
        gutter.vertical(props.spacing, props.selector)}

        ${props.spacing &&
        direction === "horizontal" &&
        gutter.horizontal(props.spacing, props.selector)}
      `,
    };

    const { spacing: _spacing, selector: _selector, ...restProps } = props;

    return (
      <Flex
        css={styles.container}
        ref={ref}
        direction={direction === "vertical" ? "column" : "row"}
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...restProps}
      />
    );
  });

type Stack = {
  Vertical: StackComponent & { Item: typeof Item };
  Horizontal: StackComponent & { Item: typeof Item };
};

const Stack: Stack = {} as Stack;
Stack.Vertical = createStackComponent({
  direction: "vertical",
}) as Stack["Vertical"];
Stack.Vertical.Item = Item;

Stack.Horizontal = createStackComponent({
  direction: "horizontal",
}) as Stack["Horizontal"];
Stack.Horizontal.Item = Item;

export default Stack;
