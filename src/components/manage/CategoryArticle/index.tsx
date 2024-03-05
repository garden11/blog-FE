import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// types
import { Category } from "src/types/category";

// components
import CategoryForm from "src/components/manage/CategoryArticle/CategoryForm";

// forms
import { CategoryFormValues } from "src/forms/categoryForm";

type Props = {
  categoryList: Category[];
  onSubmitCategoryForm: SubmitHandler<CategoryFormValues>;
  onErrorSubmitCategoryForm: SubmitErrorHandler<CategoryFormValues>;
  onClickCategoryFormDeleteButton: (id: Category["id"]) => void;
};

const CategoryArticle = (props: Props) => {
  const {
    categoryList,
    onSubmitCategoryForm,
    onErrorSubmitCategoryForm,
    onClickCategoryFormDeleteButton,
  } = props;

  return (
    <div className="content">
      <div className="items-heading">CATEGORY</div>
      <>
        {categoryList.map((listItem) => {
          return (
            <CategoryForm
              key={listItem.id}
              defaultValues={{
                id: listItem.id,
                name: listItem.name,
              }}
              onSubmit={onSubmitCategoryForm}
              onErrorSubmit={onErrorSubmitCategoryForm}
              onClickDeleteButton={onClickCategoryFormDeleteButton}
            />
          );
        })}
        <CategoryForm
          onSubmit={onSubmitCategoryForm}
          onErrorSubmit={onErrorSubmitCategoryForm}
        />
      </>
    </div>
  );
};

export default CategoryArticle;
