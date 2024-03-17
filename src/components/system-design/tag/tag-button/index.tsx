import { useRouter } from "next/router";

// componetns
import Button from "src/components/design-system/button";

// types
import { Tag } from "src/types/tag";

type Props = {
  tag: {
    id: Tag["id"] | undefined;
    name: Tag["name"];
  };
  selected?: boolean;
};

const TagButton = (props: Props) => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={(event) => {
        event.stopPropagation();

        if (props.tag.id) {
          router.push({
            pathname: "/posts",
            query: {
              tagId: props.tag.id,
            },
          });
        } else {
          router.push({
            pathname: "/",
          });
        }
      }}
      selected={props.selected}
    >
      # {props.tag.name}
    </Button>
  );
};
export default TagButton;
