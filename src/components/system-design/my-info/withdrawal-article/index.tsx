// components
import Button from "src/components/design-system/button";
import Card from "src/components/design-system/card";
import Flex from "src/components/design-system/flex";
import Heading from "src/components/design-system/heading";

type Props = {
  onClickWidthdrawalButton: () => void;
};

const WithdrawalArticle = (props: Props) => {
  return (
    <Card>
      <Card.Content>
        <Heading value="WITHDRAWAL" />

        <Flex.CenterHorizontal>
          <Button color="neutral" onClick={props.onClickWidthdrawalButton}>
            WITHDRAWAL
          </Button>
        </Flex.CenterHorizontal>
      </Card.Content>
    </Card>
  );
};

export default WithdrawalArticle;
