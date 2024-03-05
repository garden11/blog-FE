import _ from "lodash";

// constants
import { PAGE_NUMBER_BUTTON_LENGTH } from "src/constants";

// types
import { PageInfo } from "src/types/pageInfo";

// utils
import PageUtil from "src/utils/PageUtil";

type Props = {
  pageInfo: PageInfo;
  onClickButton: (page: number) => void;
};

const PageNavigation = (props: Props) => {
  const { pageInfo, onClickButton } = props;

  const numberButtonLength = PAGE_NUMBER_BUTTON_LENGTH;

  const pageUtil = new PageUtil();

  const PrevButton = () => {
    return (
      <li
        onClick={() => {
          onClickButton(pageUtil.convertToLabelFromNumber(pageInfo.number - 1));
        }}
      >
        <i className="fa fa-angle-double-left"></i>
      </li>
    );
  };

  const NumberButtonGroup = () => {
    const firstPageNumber =
      Math.floor(pageInfo.number / numberButtonLength) * numberButtonLength;
    let lastPageNumber = firstPageNumber + numberButtonLength - 1;

    if (lastPageNumber > pageInfo.totalPages)
      lastPageNumber = pageUtil.convertToNumberFromLabel(pageInfo.totalPages);

    const pageNumberList = [];

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      pageNumberList.push(i);
    }

    return (
      <>
        {pageNumberList.map((listItem) => {
          return listItem === pageInfo.number ? (
            <li key={listItem} className="active">
              {pageUtil.convertToLabelFromNumber(listItem)}
            </li>
          ) : (
            <li
              key={listItem}
              onClick={() =>
                onClickButton(pageUtil.convertToLabelFromNumber(listItem))
              }
            >
              {pageUtil.convertToLabelFromNumber(listItem)}
            </li>
          );
        })}
      </>
    );
  };

  const NextButton = () => {
    return (
      <li
        onClick={() =>
          onClickButton(pageUtil.convertToLabelFromNumber(pageInfo.number + 1))
        }
      >
        <i className="fa fa-angle-double-right"></i>
      </li>
    );
  };

  return (
    <ul className="page-numbers">
      {!pageInfo.first && <PrevButton />}
      {pageInfo.totalPages > 0 && <NumberButtonGroup />}
      {!pageInfo.last && <NextButton />}
    </ul>
  );
};

export default PageNavigation;
