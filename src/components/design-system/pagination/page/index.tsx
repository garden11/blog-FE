import { cx } from "@emotion/css";

type Props = { value: number; isActive: boolean; onClick: () => void };

const Page = (props: Props) => {
  return (
    <li
      className={cx("button", {
        active: props.isActive,
      })}
      onClick={() => !props.isActive && props.onClick()}
    >
      {props.value}
    </li>
  );
};

export default Page;
