import { useRouter } from "next/router";
import { ReactElement } from "react";

// components
import Button from "src/components/design-system/button";
import CenteredLayout from "src/components/system-design/layout/centered-layout";
import Stack from "src/components/design-system/stack";

// styles
import { spacing } from "src/styles/spacing";

// types
import { Page } from "../types";

type Props = {};

const App404: Page<Props> = (props) => {
  const router = useRouter();

  const handleClickGoBackButton = () => {
    router.back();
  };

  return (
    <Stack.Vertical spacing={spacing.unit20} alignItems="center">
      <div>페이지를 찾을 수 없습니다.</div>
      <Button onClick={handleClickGoBackButton}>GO BACK</Button>
    </Stack.Vertical>
  );
};

App404.layout = (page: ReactElement) => {
  return <CenteredLayout>{page}</CenteredLayout>;
};

export default App404;
