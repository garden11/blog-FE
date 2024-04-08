import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";

// components
import Pagination from "src/components/design-system/pagination";
import CommentForm from "../comment-form";
import CommentList from "./comment-list";
import Heading from "src/components/design-system/heading";
import Stack from "src/components/design-system/stack";

// forms
import { CommentFormValues } from "src/forms/commentForm";

// styles
import { spacing } from "src/styles/spacing";

// types
import { CommentDetail } from "src/types/comment";
import { PageInfo } from "src/types/pageInfo";

type Props = {
  comments: CommentDetail[];
  commentsPageInfo: PageInfo;
  onSubmitCommentForm: SubmitHandler<CommentFormValues>;
  onErrorSubmitCommentForm: SubmitErrorHandler<CommentFormValues>;
  onClickDeleteCommentButton: (comment: CommentDetail["id"]) => void;
  onClickPageNavigationButton: (page: number) => void;
};

const CommentBoard = (props: Props) => {
  const styles = {
    container: css``,
  };

  return (
    <div css={styles.container}>
      <Heading value={`${props.commentsPageInfo.totalElements} COMMENTS`} />

      <Stack.Vertical spacing={spacing.unit30}>
        <CommentList
          comments={props.comments}
          onClickDeleteButton={props.onClickDeleteCommentButton}
        />

        {props.commentsPageInfo.totalPages !== 0 && (
          <Pagination
            pageInfo={props.commentsPageInfo}
            onClickButton={props.onClickPageNavigationButton}
          />
        )}

        <CommentForm
          onSubmit={props.onSubmitCommentForm}
          onErrorSubmit={props.onErrorSubmitCommentForm}
        />
      </Stack.Vertical>
    </div>
  );
};

export default CommentBoard;
