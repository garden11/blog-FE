import Link from "next/link";

// models
import { ProfileView } from "src/models/profile";

// hooks
import useAuth from "src/hooks/useAuth";

// components
import ProfilePicture from "src/components/image/ProfilePicture";

type Props = {
  profile: ProfileView;
  onClickCreatePostButton: () => void;
};

const Profile = (props: Props) => {
  const { profile, onClickCreatePostButton } = props;

  const { isSignedIn } = useAuth();

  const PostButton = () => {
    return (
      <button
        className="main-button d-block ml-auto mr-auto"
        onClick={onClickCreatePostButton}
      >
        POST
      </button>
    );
  };

  const BlogManageButton = () => {
    return (
      <div className="blog-manage">
        <Link href={`/${profile.username}/manage`}>
          <span>MANAGEMENT</span>
          <img className="icon ml-1" src="/assets/images/settings-icon.png" />
        </Link>
      </div>
    );
  };

  return (
    <div className="sidebar-item profile">
      <ProfilePicture image={{ uri: profile.profileImageUri }} />
      <div className="sidebar-heading">
        <h2>
          <Link href={`/${profile.username}`}>{profile.username}</Link>
        </h2>
      </div>
      {/*  블로그 사용자인 경우 포스트 버튼, 블로그 관리 버튼 추가 */}
      {isSignedIn(profile.username) && (
        <>
          <PostButton />
          <BlogManageButton />
        </>
      )}
    </div>
  );
};

export default Profile;
