import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// api
import * as API from "src/api";

// components
import TagButton from "../tag-button";
import Flex from "src/components/design-system/flex";

// styles
import { coerceCssPixelValue } from "src/styles/coerceCssPixelValue";
import { spacing } from "src/styles/spacing";

// types
import { Tag } from "src/types/tag";

type Props = {
  selected?: Tag["id"] | undefined;
};

const TagList = (props: Props) => {
  const [tagList, setTagList] = useState<Tag[]>([]);

  useEffect(() => {
    const getTagList = async () => {
      const tagList = await API.getTagList({});

      setTagList(tagList);
    };

    getTagList();
  }, []);

  return (
    <Flex
      wrap="wrap"
      columnGap={coerceCssPixelValue(spacing.unit8)}
      rowGap={coerceCssPixelValue(spacing.unit8)}
    >
      <TagButton
        tag={{ id: undefined, name: "All" }}
        selected={!props.selected}
      />

      {tagList.map((listItem) => (
        <TagButton
          key={listItem.id}
          tag={listItem}
          selected={listItem.id === props.selected}
        />
      ))}
    </Flex>
  );
};

export default TagList;
