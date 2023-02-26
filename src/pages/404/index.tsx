import { useRouter } from "next/router";

// components
import MessageBox from "src/components/shared/MessageBox";

type Props = {};

const App404 = (props: Props) => {
  const router = useRouter();

  const handleClickGoBackButton = () => {
    router.back();
  };

  return (
    <div className="not-found">
      <div className="d-flex h-100">
        <MessageBox className="m-auto  text-center">
          <p>페이지를 찾을 수 없습니다.</p>
          <button
            type="button"
            onClick={handleClickGoBackButton}
            className="main-button"
          >
            GO BACK
          </button>
        </MessageBox>
      </div>
    </div>
  );
};

export default App404;
