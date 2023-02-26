type Props = {
  onClickWidthdrawalButton: () => void;
};

const WithdrawalArticle = (props: Props) => {
  const { onClickWidthdrawalButton } = props;

  return (
    <div className="content">
      <div className="items-heading">WITHDRAWAL</div>
      <button
        className="withdrawal-button d-block ml-auto mr-auto"
        onClick={onClickWidthdrawalButton}
      >
        WITHDRAWAL
      </button>
    </div>
  );
};

export default WithdrawalArticle;
