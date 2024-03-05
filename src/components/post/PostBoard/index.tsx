import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";

// types
import { PageInfo } from "src/types/pageInfo";
import { PostView } from "src/types/post";

// components
import PostList from "./PostList";
import PageNavigation from "src/components/shared/PageNavigation";
import MessageBox from "src/components/shared/MessageBox";

type Props = {
  canPost?: boolean;
  postList: PostView[];
  postListPageInfo: PageInfo;
  onClickPostListItem: (postId: PostView["id"]) => void;
  onClickPageNavigationButton: (page: number) => void;
  onClickCreatePostButton: () => void;
};

const PostBoard = (props: Props) => {
  const {
    canPost,
    postList,
    postListPageInfo,
    onClickPostListItem,
    onClickPageNavigationButton,
    onClickCreatePostButton,
  } = props;

  const PostButton = () => {
    return (
      <button onClick={onClickCreatePostButton} className="post-edit">
        <EditIcon fontSize="large" />
      </button>
    );
  };

  return (
    <>
      {canPost && (
        <div className="d-flex justify-content-end mb-2">
          <PostButton />
        </div>
      )}
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
