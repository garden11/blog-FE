import Link from "next/link";
// models
import { CommentView } from "src/models/comment";

// hooks
import useAuth from "src/hooks/useAuth";

// components
import CommentAuthorThumbnail from "../../../image/CommentAuthorThumbnail";
import DateUtil from "src/utils/DateUtil";

type Props = {
  list: CommentView[];
  onClickDeleteButton: (commentId: CommentView["id"]) => void;
};

const CommentList = (props: Props) => {
  const { list, onClickDeleteButton } = props;

  const { isSignedIn } = useAuth();

  const dateUtil = new DateUtil();

  return (
    <>
      {list.map((listItem) => {
        return (
          <li key={listItem.id}>
            <CommentAuthorThumbnail
              image={{
                uri: listItem.profileImageUri ?? undefined,
              }}
            />
            <div className="right-content">
              <h4>
                <Link href={`/${listItem.username}`}>{listItem.username}</Link>
                <span>
                  {dateUtil.utcUnixStringToDateString(listItem.registeredAt)}{" "}
                  작성
                </span>
              </h4>
              <p>{listItem.content}</p>
            </div>
            <div className="comment-deal">
              {/* 댓글을 작성한 사용자인 경우 삭제 버튼 추가 */}
              {isSignedIn(listItem.username) && (
                <>
                  <button onClick={() => onClickDeleteButton(listItem.id)}>
                    DELETE
                  </button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default CommentList;
