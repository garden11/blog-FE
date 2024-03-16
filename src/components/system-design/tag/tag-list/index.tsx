import { css } from "@emotion/react";
import { useEffect, useState } from "react";

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
import { useRouter } from "next/router";

type PageQuery = {
  tagId?: string | undefined;
};

type Props = {};

const TagList = (props: Props) => {
  const router = useRouter();
  const { tagId } = router.query as PageQuery;

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
      <TagButton tag={{ id: undefined, name: "All" }} selected={!tagId} />

      {tagList.map((listItem) => (
        <TagButton
          key={listItem.id}
          tag={listItem}
          selected={listItem.id === tagId}
        />
      ))}
    </Flex>
  );
};

export default TagList;
