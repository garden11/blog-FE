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
  tags: Tag[];
  selectedTagId?: Tag["id"] | undefined;
};

const TagList = (props: Props) => {
  return (
    <Flex
      wrap="wrap"
      columnGap={coerceCssPixelValue(spacing.unit8)}
      rowGap={coerceCssPixelValue(spacing.unit8)}
    >
      <TagButton
        tag={{ id: undefined, name: "All" }}
        selected={!props.selectedTagId}
      />

      {props.tags.map((tag) => (
        <TagButton
          key={tag.id}
          tag={tag}
          selected={tag.id === props.selectedTagId}
        />
      ))}
    </Flex>
  );
};

export default TagList;
