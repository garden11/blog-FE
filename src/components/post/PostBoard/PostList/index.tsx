import _ from "lodash";

// models
import { PostView } from "src/models/post";
import DateUtil from "src/utils/DateUtil";

// components
import PostThumbnail from "../../../image/PostThumbnail";

type Props = {
  list: PostView[];
  onClickListItem: (postId: PostView["id"]) => void;
};

const PostList = (props: Props) => {
  const { list, onClickListItem } = props;

  const dateUtil = new DateUtil();

  return (
    <>
      {list.map((listItem) => {
        return (
          <div
            className="blog-post"
            key={listItem.id}
            onClick={() => onClickListItem(listItem.id)}
          >
            <PostThumbnail
              image={{
                uri: listItem.thumbnailImageUri ?? undefined,
              }}
            />
            <div className="down-content">
              <span>{listItem.categoryName}</span>
              <a>
                <h4>{listItem.title}</h4>
              </a>
              <ul className="post-info">
                <li>
                  <a>{listItem.username}</a>
                </li>
                <li>
                  <a>
                    {listItem.registeredAt &&
                      dateUtil.utcUnixStringToDateString(listItem.registeredAt)}
                  </a>
                </li>
                {/* <li><a href="#">12 Comments</a></li> */}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostList;
