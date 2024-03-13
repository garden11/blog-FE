import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";

// components
import Card from "src/components/design-system/card";
import CategoryForm from "src/components/system-design/manage/category-article/category-form";
import Flex from "src/components/design-system/flex";
import Heading from "src/components/design-system/heading";
import Stack from "src/components/design-system/stack";

// forms
import { CategoryFormValues } from "src/forms/categoryForm";

// types
import { Category } from "src/types/category";

// styles
import { spacing } from "src/styles/spacing";

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
    <Card>
      <Card.Content>
        <Heading value="CATEGORY" />

        <Flex.CenterHorizontal>
          <Stack.Vertical spacing={spacing.unit20}>
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
          </Stack.Vertical>
        </Flex.CenterHorizontal>
      </Card.Content>
    </Card>
  );
};

export default CategoryArticle;
