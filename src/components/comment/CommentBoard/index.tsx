import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

// components
import PageNavigation from "src/components/shared/PageNavigation";
import CommentForm from "../CommentForm";

import CommentList from "./CommentList";

// types
import { CommentView } from "src/types/comment";
import { PageInfo } from "src/types/pageInfo";

// forms
import { CommentFormValues } from "src/forms/commentForm";

type Props = {
  commentList: CommentView[];
  commentListPageInfo: PageInfo;
  onSubmitCommentForm: SubmitHandler<CommentFormValues>;
  onErrorSubmitCommentForm: SubmitErrorHandler<CommentFormValues>;
  onClickDeleteCommentButton: (comment: CommentView["id"]) => void;
  onClickPageNavigationButton: (page: number) => void;
};

const CommentBoard = (props: Props) => {
  const {
    commentList,
    commentListPageInfo,
    onSubmitCommentForm,
    onErrorSubmitCommentForm,
    onClickDeleteCommentButton,
    onClickPageNavigationButton,
  } = props;

  return (
    <div className="sidebar-item comments">
      <div className="sidebar-heading">
        <h2>{commentListPageInfo.totalElements} COMMENTS</h2>
        <div className="content">
          <div className="row">
            <div className="col-lg-12">
              <ul>
                <CommentList
                  list={commentList}
                  onClickDeleteButton={onClickDeleteCommentButton}
                />
              </ul>
            </div>
            <div className="col-lg-12">
              <PageNavigation
                pageInfo={commentListPageInfo}
                onClickButton={onClickPageNavigationButton}
              />
            </div>
            <div className="col-lg-12">
              <CommentForm
                onSubmit={onSubmitCommentForm}
                onErrorSubmit={onErrorSubmitCommentForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBoard;
