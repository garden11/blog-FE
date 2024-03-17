import _ from "lodash";
import React from "react";

// components
import Stack from "src/components/design-system/stack";
import Spacing from "src/components/design-system/spacing";
import Line from "src/components/design-system/line";
import Item from "./item";

// styles
import { spacing } from "src/styles/spacing";

// types
import { PostDetail } from "src/types/post";

type Props = {
  list: PostDetail[];
  onClickListItem: (postId: PostDetail["id"]) => void;
};

const PostList = (props: Props) => {
  return (
    <Stack.Vertical>
      {props.list.map((listItem, index) => {
        return (
          <React.Fragment key={listItem.id}>
            <Item
              post={listItem}
              onClick={() => props.onClickListItem(listItem.id)}
            />
            {index !== props.list.length - 1 && (
              <>
                <Spacing.Vertical size={spacing.unit30} />
                <Line.Horizontal />
                <Spacing.Vertical size={spacing.unit30} />
              </>
            )}
          </React.Fragment>
        );
      })}
    </Stack.Vertical>
  );
};

export default PostList;
