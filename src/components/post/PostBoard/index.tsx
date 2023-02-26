import _ from "lodash";

// models
import { PageInfo } from "src/models/pageInfo";
import { PostView } from "src/models/post";

// components
import PostList from "./PostList";
import PageNavigation from "src/components/shared/PageNavigation";
import MessageBox from "src/components/shared/MessageBox";

type Props = {
  postList: PostView[];
  postListPageInfo: PageInfo;
  onClickPostListItem: (postId: PostView["id"]) => void;
  onClickPageNavigationButton: (page: number) => void;
};

const PostBoard = (props: Props) => {
  const {
    postList,
    postListPageInfo,
    onClickPostListItem,
    onClickPageNavigationButton,
  } = props;

  return (
    <>
      {_.isEmpty(postList) ? (
        <div className="d-flex h-100">
          <MessageBox className="m-auto">포스트가 없습니다.</MessageBox>
        </div>
      ) : (
        <div className="all-blog-posts">
          <div className="row">
            <div className="col-lg-12">
              <PostList list={postList} onClickListItem={onClickPostListItem} />
            </div>
            <div className="col-lg-12">
              <PageNavigation
                pageInfo={postListPageInfo}
                onClickButton={onClickPageNavigationButton}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostBoard;
