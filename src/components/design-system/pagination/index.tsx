import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import _ from "lodash";

// constants
import { PAGE_NUMBER_BUTTON_LENGTH } from "src/constants";

// styles
import { colors } from "src/styles/colors";
import { flex } from "src/styles/flex";
import { spacing } from "src/styles/spacing";

// types
import { PageInfo } from "src/types/pageInfo";

// utils
import PageUtil from "src/utils/PageUtil";

type Props = {
  pageInfo: PageInfo;
  onClickButton: (page: number) => void;
};

const Pagination = (props: Props) => {
  const numberButtonLength = PAGE_NUMBER_BUTTON_LENGTH;

  const pageUtil = new PageUtil();

  const styles = {
    contianer: css`
      ${flex.display};
      ${flex.justifyContent("center")};

      > .button {
        ${spacing.margin.x20};
        font-size: 15px;
        color: ${colors.heading};
        font-weight: 500;
        transition: all 0.3s;
        cursor: pointer;

        &.active {
          font-weight: 900;
        }

        &.disabled {
          color: ${colors.gray};
        }
      }
    `,
  };

  const NumberButtons = () => {
    const firstPageNumber =
      Math.floor(props.pageInfo.number / numberButtonLength) *
      numberButtonLength;
    let lastPageNumber = firstPageNumber + numberButtonLength - 1;

    if (lastPageNumber > props.pageInfo.totalPages)
      lastPageNumber = pageUtil.convertToNumberFromLabel(
        props.pageInfo.totalPages
      );

    const pageNumbers = [];

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {pageNumbers.map((pageNumber) => {
          return pageNumber === props.pageInfo.number ? (
            <li key={pageNumber} className={cx("button", "active")}>
              {pageUtil.convertToLabelFromNumber(pageNumber)}
            </li>
          ) : (
            <li
              key={pageNumber}
              className={cx("button")}
              onClick={() =>
                props.onClickButton(
                  pageUtil.convertToLabelFromNumber(pageNumber)
                )
              }
            >
              {pageUtil.convertToLabelFromNumber(pageNumber)}
            </li>
          );
        })}
      </>
    );
  };

  const PrevButton = () => {
    const disabled = props.pageInfo.first;

    return (
      <li
        className={cx("button", {
          disabled,
        })}
        onClick={() => {
          !disabled &&
            props.onClickButton(
              pageUtil.convertToLabelFromNumber(props.pageInfo.number - 1)
            );
        }}
      >
        {/** < */}
        &lt;
      </li>
    );
  };

  const NextButton = () => {
    const disabled = props.pageInfo.last;

    return (
      <li
        className={cx("button", {
          disabled,
        })}
        onClick={() =>
          !disabled &&
          props.onClickButton(
            pageUtil.convertToLabelFromNumber(props.pageInfo.number + 1)
          )
        }
      >
        {/** > */}
        &gt;
      </li>
    );
  };

  return (
    <ul css={styles.contianer} className="page-numbers">
      <PrevButton />
      <NumberButtons />
      <NextButton />
    </ul>
  );
};

export default Pagination;
