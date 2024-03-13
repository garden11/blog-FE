import { css, SerializedStyles } from "@emotion/react";

// styles
import { coerceCssPixelValue } from "./coerceCssPixelValue";

type Unit = 2 | 4 | 6 | 8 | 10 | 16 | 20 | 30 | 50 | 100 | 150;
type Property = "x" | "y" | "top" | "right" | "bottom" | "left";

type Spacing = {
  unit2: Unit;
  unit4: Unit;
  unit6: Unit;
  unit8: Unit;
  unit10: Unit;
  unit16: Unit;
  unit20: Unit;
  unit30: Unit;
  unit50: Unit;
  unit100: Unit;
  unit150: Unit;

  margin: ((value: number) => SerializedStyles) & {
    top: (value: number) => SerializedStyles;
    top2: SerializedStyles;
    top4: SerializedStyles;
    top6: SerializedStyles;
    top8: SerializedStyles;
    top10: SerializedStyles;
    top16: SerializedStyles;
    top20: SerializedStyles;
    top30: SerializedStyles;
    top50: SerializedStyles;
    top100: SerializedStyles;
    top150: SerializedStyles;

    bottom: (value: number) => SerializedStyles;
    bottom2: SerializedStyles;
    bottom4: SerializedStyles;
    bottom6: SerializedStyles;
    bottom8: SerializedStyles;
    bottom10: SerializedStyles;
    bottom16: SerializedStyles;
    bottom20: SerializedStyles;
    bottom30: SerializedStyles;
    bottom50: SerializedStyles;
    bottom100: SerializedStyles;
    bottom150: SerializedStyles;

    left: (value: number) => SerializedStyles;
    left2: SerializedStyles;
    left4: SerializedStyles;
    left6: SerializedStyles;
    left8: SerializedStyles;
    left10: SerializedStyles;
    left16: SerializedStyles;
    left20: SerializedStyles;
    left30: SerializedStyles;
    left50: SerializedStyles;
    left100: SerializedStyles;
    left150: SerializedStyles;

    right: (value: number) => SerializedStyles;
    right2: SerializedStyles;
    right4: SerializedStyles;
    right6: SerializedStyles;
    right8: SerializedStyles;
    right10: SerializedStyles;
    right16: SerializedStyles;
    right20: SerializedStyles;
    right30: SerializedStyles;
    right50: SerializedStyles;
    right100: SerializedStyles;
    right150: SerializedStyles;

    x: (value: number) => SerializedStyles;
    x2: SerializedStyles;
    x4: SerializedStyles;
    x6: SerializedStyles;
    x8: SerializedStyles;
    x10: SerializedStyles;
    x16: SerializedStyles;
    x20: SerializedStyles;
    x30: SerializedStyles;
    x50: SerializedStyles;
    x100: SerializedStyles;
    x150: SerializedStyles;

    y: (value: number) => SerializedStyles;
    y2: SerializedStyles;
    y4: SerializedStyles;
    y6: SerializedStyles;
    y8: SerializedStyles;
    y10: SerializedStyles;
    y16: SerializedStyles;
    y20: SerializedStyles;
    y30: SerializedStyles;
    y50: SerializedStyles;
    y100: SerializedStyles;
    y150: SerializedStyles;
  };

  margin2: SerializedStyles;
  margin4: SerializedStyles;
  margin6: SerializedStyles;
  margin8: SerializedStyles;
  margin10: SerializedStyles;
  margin16: SerializedStyles;
  margin20: SerializedStyles;
  margin30: SerializedStyles;
  margin50: SerializedStyles;
  margin100: SerializedStyles;
  margin150: SerializedStyles;

  padding: ((value: number) => SerializedStyles) & {
    top: (value: number) => SerializedStyles;
    top2: SerializedStyles;
    top4: SerializedStyles;
    top6: SerializedStyles;
    top8: SerializedStyles;
    top10: SerializedStyles;
    top16: SerializedStyles;
    top20: SerializedStyles;
    top30: SerializedStyles;
    top50: SerializedStyles;
    top100: SerializedStyles;
    top150: SerializedStyles;

    bottom: (value: number) => SerializedStyles;
    bottom2: SerializedStyles;
    bottom4: SerializedStyles;
    bottom6: SerializedStyles;
    bottom8: SerializedStyles;
    bottom10: SerializedStyles;
    bottom16: SerializedStyles;
    bottom20: SerializedStyles;
    bottom30: SerializedStyles;
    bottom50: SerializedStyles;
    bottom100: SerializedStyles;
    bottom150: SerializedStyles;

    left: (value: number) => SerializedStyles;
    left2: SerializedStyles;
    left4: SerializedStyles;
    left6: SerializedStyles;
    left8: SerializedStyles;
    left10: SerializedStyles;
    left16: SerializedStyles;
    left20: SerializedStyles;
    left30: SerializedStyles;
    left50: SerializedStyles;
    left100: SerializedStyles;
    left150: SerializedStyles;

    right: (value: number) => SerializedStyles;
    right2: SerializedStyles;
    right4: SerializedStyles;
    right6: SerializedStyles;
    right8: SerializedStyles;
    right10: SerializedStyles;
    right16: SerializedStyles;
    right20: SerializedStyles;
    right30: SerializedStyles;
    right50: SerializedStyles;
    right100: SerializedStyles;
    right150: SerializedStyles;

    x: (value: number) => SerializedStyles;
    x2: SerializedStyles;
    x4: SerializedStyles;
    x6: SerializedStyles;
    x8: SerializedStyles;
    x10: SerializedStyles;
    x16: SerializedStyles;
    x20: SerializedStyles;
    x30: SerializedStyles;
    x50: SerializedStyles;
    x100: SerializedStyles;
    x150: SerializedStyles;

    y: (value: number) => SerializedStyles;
    y2: SerializedStyles;
    y4: SerializedStyles;
    y6: SerializedStyles;
    y8: SerializedStyles;
    y10: SerializedStyles;
    y16: SerializedStyles;
    y20: SerializedStyles;
    y30: SerializedStyles;
    y50: SerializedStyles;
    y100: SerializedStyles;
    y150: SerializedStyles;
  };

  padding2: SerializedStyles;
  padding4: SerializedStyles;
  padding6: SerializedStyles;
  padding8: SerializedStyles;
  padding10: SerializedStyles;
  padding16: SerializedStyles;
  padding20: SerializedStyles;
  padding30: SerializedStyles;
  padding50: SerializedStyles;
  padding100: SerializedStyles;
  padding150: SerializedStyles;
};

export const spacing = {} as Spacing;

const units: Unit[] = [2, 4, 6, 8, 10, 16, 20, 30, 50, 100, 150];
const properties: Property[] = ["x", "y", "top", "right", "bottom", "left"];

const getStyle = (
  marginOrPadding: "margin" | "padding",
  option?: { [key in Property]?: Unit } | Unit | Property
) => {
  // spacing.margin(5)
  if (!option) {
    return (value: number) => css`
      ${`${marginOrPadding}: ${coerceCssPixelValue(value)}`}
    `;
  }

  // spacing.margin4
  if (typeof option === "number") {
    return css`
      ${`${marginOrPadding}: ${coerceCssPixelValue(option)}`}
    `;
  }

  // spacing.margin.left(5)
  if (typeof option === "string") {
    let box: ("top" | "right" | "bottom" | "left")[] = [];

    if (option === "x") {
      box = ["right", "left"];
    }

    if (option === "y") {
      box = ["top", "bottom"];
    }

    if (option === "top") {
      box = ["top"];
    }

    if (option === "left") {
      box = ["left"];
    }

    if (option === "bottom") {
      box = ["bottom"];
    }

    if (option === "right") {
      box = ["right"];
    }

    return (value: number) => {
      const style = box
        .map(
          (dir) => `${marginOrPadding}-${dir}: ${coerceCssPixelValue(value)}`
        )
        .join(";");
      return css(style);
    };
  }

  // spacing.margin.left4
  if (typeof option === "object") {
    const box: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    } = {};

    if (option.x !== undefined) {
      box.left = box.right = option.x;
    }
    if (option.y !== undefined) {
      box.top = box.bottom = option.y;
    }
    if (option.top !== undefined) {
      box.top = option.top;
    }
    if (option.right !== undefined) {
      box.right = option.right;
    }
    if (option.bottom !== undefined) {
      box.bottom = option.bottom;
    }
    if (option.left !== undefined) {
      box.left = option.left;
    }

    const style = Object.entries(box)
      .filter(([, value]) => value !== null)
      .map(
        ([dir, value]) =>
          `${marginOrPadding}-${dir}: ${coerceCssPixelValue(value)}`
      )
      .join(";");

    return css(style);
  }
};

const createUnits = () => {
  for (const unit of units) {
    // spacing.unit4
    (spacing as any)[`unit${unit}`] = unit;
  }
};

const createMarginOrPadding = (marginOrPadding: "margin" | "padding") => {
  (spacing as any)[marginOrPadding] = getStyle(marginOrPadding);

  for (const unit of units) {
    (spacing as any)[`${marginOrPadding}${unit}`] = getStyle(
      marginOrPadding,
      unit
    );
  }

  for (const property of properties) {
    (spacing as any)[marginOrPadding][`${property}`] = getStyle(
      marginOrPadding,
      property
    );
  }

  for (const property of properties) {
    for (const unit of units) {
      (spacing as any)[marginOrPadding][`${property}${unit}`] = getStyle(
        marginOrPadding,
        { [property]: unit }
      );
    }
  }
};

createUnits();
createMarginOrPadding("margin");
createMarginOrPadding("padding");
