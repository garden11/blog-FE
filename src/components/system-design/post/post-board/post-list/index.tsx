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
  posts: PostDetail[];
  onClickItem: (postId: PostDetail["id"]) => void;
};

const PostList = (props: Props) => {
  return (
    <Stack.Vertical>
      {props.posts.map((post, index) => {
        return (
          <React.Fragment key={post.id}>
            <Item post={post} onClick={() => props.onClickItem(post.id)} />
            {index !== props.posts.length - 1 && (
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
