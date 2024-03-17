import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
  useContext,
} from "react";

// components
import Item from "./item";

// contexts
import { Context } from "./contexts";

// types
import { ItemHeight, ItemWidth, LabelWidth, Variant } from "./types";

type Props = {
  variant?: Variant;
  labelWidth?: LabelWidth;
  itemWidth?: ItemWidth;
  itemHeight?: ItemHeight;
} & ComponentPropsWithoutRef<"form">;

type FormComponent = (
  props: Props & Partial<Pick<ComponentPropsWithRef<"form">, "ref">>
) => JSX.Element | null;

const FormComponent: FormComponent = forwardRef(function FormComponent(
  props,
  ref
) {
  const form = useContext(Context);

  const { variant, labelWidth, itemWidth, itemHeight } = {
    variant: props.variant || form.variant,
    labelWidth: props.labelWidth || form.labelWidth,
    itemWidth: props.itemWidth || form.itemWidth,
    itemHeight: props.itemHeight || form.itemHeight,
  };

  const {
    variant: _variant,
    labelWidth: _labelWidth,
    itemWidth: _itemWidth,
    itemHeight: _itemHeight,
    ...restProps
  } = props;

  return (
    <Context.Provider
      value={{
        variant,
        labelWidth,
        itemWidth,
        itemHeight,
      }}
    >
      <form ref={ref} {...restProps} />
    </Context.Provider>
  );
});

type Form = FormComponent & {
  Item: typeof Item;
};

const Form: Form = FormComponent as Form;
Form.Item = Item;

export default Form;
