// types
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import Link from "next/link";
import { gutter } from "src/styles/gutter";
import { spacing } from "src/styles/spacing";
import { Category } from "src/types/category";

type Props = {
  categoryId?: Category["id"];
  list: Category[];
};

const CategoryList = (props: Props) => {
  const styles = {
    contianer: css`
      ${gutter.vertical(spacing.unit16)};

      > .item {
        a {
          font-size: 15px;
          font-weight: 700;
          color: #20232e;
          transition: all 0.3s;

          &.active {
            color: #f48840;
          }

          :hover {
            color: #f48840;
          }
        }
      }
    `,
  };

  return (
    <ul css={styles.contianer}>
      {props.list.map((listItem) => {
        return (
          <li key={listItem.id} className={cx("item")}>
            <Link
              className={
                listItem.id === props.categoryId ? "active" : undefined
              }
              href={{
                pathname: `/${listItem.username}`,
                query: {
                  categoryId: listItem.id,
                },
              }}
            >
              - {listItem.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
