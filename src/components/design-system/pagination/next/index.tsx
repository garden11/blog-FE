import { cx } from "@emotion/css";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const Next = (props: Props) => {
  return (
    <li
      className={cx("button", {
        disabled: props.disabled,
      })}
      onClick={props.onClick}
    >
      {/** > */}
      &gt;
    </li>
  );
};

export default Next;
