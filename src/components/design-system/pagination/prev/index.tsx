import { cx } from "@emotion/css";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const Prev = (props: Props) => {
  return (
    <li
      className={cx("button", {
        disabled: props.disabled,
      })}
      onClick={() => {
        !props.disabled && props.onClick();
      }}
    >
      {/** < */}
      &lt;
    </li>
  );
};

export default Prev;
