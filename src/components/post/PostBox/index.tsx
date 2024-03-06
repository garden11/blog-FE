// types
import { PostDetail } from "src/types/post";

// hooks
import useAuth from "src/hooks/useAuth";

// utils
import DateUtil from "src/utils/DateUtil";

type Props = {
  post: PostDetail;
  onClickUpdatePostButton: () => void;
  onClickDeletePostButton: (postId: PostDetail["id"]) => void;
};

const PostBox = (props: Props) => {
  const { post, onClickUpdatePostButton, onClickDeletePostButton } = props;

  const { isSignedIn } = useAuth();

  const dateUtil = new DateUtil();

  return (
    <div className="all-blog-posts">
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-post">
            <div className="down-content">
              <span>{post.categoryName}</span>
              <a>
                <h4>{post.title}</h4>
              </a>
              <ul className="post-info">
                <li>
                  <a>{post.username}</a>
                </li>
                <li>
                  <a>
                    {post.registeredAt &&
                      dateUtil.utcUnixStringToDateString(
                        post.registeredAt
                      )}{" "}
                    작성
                  </a>
                </li>
                {post.updatedAt && (
                  <li>
                    <a>
                      {dateUtil.utcUnixStringToDateString(post.updatedAt)} 수정
                    </a>
                  </li>
                )}
                {/* <li><a href="#">10 Comments</a></li> */}
              </ul>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{
                  __html: post.content ? post.content : "",
                }}
              />
              <div className="post-options">
                <div className="row">
                  <div className="col-lg-12">
                    {/* 블로그 주인인 경우 수정, 삭제 버튼 추가 */}
                    {isSignedIn(post.username) && (
                      <ul className="post-deal">
                        <li>
                          <a onClick={onClickUpdatePostButton}>EDIT</a>
                        </li>
                        &nbsp;&nbsp;
                        <li onClick={() => onClickDeletePostButton(post.id)}>
                          DELETE
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
