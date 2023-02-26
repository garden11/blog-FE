import _ from "lodash";

// components
import CategoryList from "./CategoryList";
import MessageBox from "../../MessageBox";

// models
import { Category } from "src/models/category";

type Props = {
  categoryId?: Category["id"];
  categoryList: Category[];
};

const CategoryMenu = (props: Props) => {
  const { categoryId, categoryList } = props;

  return (
    <div className="sidebar-item categories">
      <div className="sidebar-heading">
        <span>CATEGORIES</span>
      </div>
      {_.isEmpty(categoryList) ? (
        <div className="d-flex h-100">
          <MessageBox className="m-auto">카테고리가 없습니다.</MessageBox>
        </div>
      ) : (
        <div className="content">
          <CategoryList list={categoryList} categoryId={categoryId} />
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
