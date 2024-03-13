import _ from "lodash";
import { css } from "@emotion/react";
import { cx } from "@emotion/css";

// components
import Card from "src/components/design-system/card";
import CategoryList from "./category-list";
import Flex from "src/components/design-system/flex";
import Heading from "src/components/design-system/heading";

// types
import { Category } from "src/types/category";

type Props = {
  categoryId?: Category["id"];
  categoryList: Category[];
};

const CategoryMenu = (props: Props) => {
  const styles = {
    container: css`
      .empty {
        min-height: 200px;
      }
    `,
  };

  return (
    <div css={styles.container}>
      <Card>
        <Card.Content padding="small">
          <Heading value="CATEGORIES" />

          {_.isEmpty(props.categoryList) ? (
            <Flex.Center className={cx("empty")}>
              카테고리가 없습니다.
            </Flex.Center>
          ) : (
            <CategoryList
              list={props.categoryList}
              categoryId={props.categoryId}
            />
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default CategoryMenu;
