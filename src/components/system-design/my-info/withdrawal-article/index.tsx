// components
import Button from "src/components/design-system/button";
import Flex from "src/components/design-system/flex";
import Heading from "src/components/design-system/heading";

type Props = {
  onClickWidthdrawalButton: () => void;
};

const WithdrawalArticle = (props: Props) => {
  return (
    <>
      <Heading value="WITHDRAWAL" />

      <Flex.CenterHorizontal>
        <Button color="neutral" onClick={props.onClickWidthdrawalButton}>
          WITHDRAWAL
        </Button>
      </Flex.CenterHorizontal>
    </>
  );
};

export default WithdrawalArticle;
