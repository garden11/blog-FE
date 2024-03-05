// types
import Link from "next/link";
import { Category } from "src/types/category";

type Props = {
  categoryId?: Category["id"];
  list: Category[];
};

const CategoryList = (props: Props) => {
  const { categoryId, list } = props;

  return (
    <ul>
      {list.map((listItem) => {
        return (
          <li key={listItem.id}>
            <Link
              className={listItem.id === categoryId ? "active" : undefined}
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
