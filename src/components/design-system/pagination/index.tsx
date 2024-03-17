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
        height: 50px;
        width: 50px;
        ${spacing.margin.x4};
        text-align: center;
        line-height: 50px;
        background-color: ${colors.white};
        font-size: 15px;
        color: ${colors.grayDark};
        border: 1px solid ${colors.borderLight};
        font-weight: 500;
        transition: all 0.3s;

        :hover {
          color: ${colors.primary};
        }

        &.active {
          background-color: ${colors.primary};
          border-color: ${colors.primary};
          color: ${colors.white};

          :hover {
            color: ${colors.white};
          }
        }
      }
    `,
  };

  const PrevButton = () => {
    return (
      <li
        className={cx("button")}
        onClick={() => {
          props.onClickButton(
            pageUtil.convertToLabelFromNumber(props.pageInfo.number - 1)
          );
        }}
      >
        <i className="fa fa-angle-double-left" />
      </li>
    );
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

    const pageNumberList = [];

    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      pageNumberList.push(i);
    }

    return (
      <>
        {pageNumberList.map((listItem) => {
          return listItem === props.pageInfo.number ? (
            <li key={listItem} className={cx("button", "active")}>
              {pageUtil.convertToLabelFromNumber(listItem)}
            </li>
          ) : (
            <li
              key={listItem}
              className={cx("button")}
              onClick={() =>
                props.onClickButton(pageUtil.convertToLabelFromNumber(listItem))
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
        className={cx("button")}
        onClick={() =>
          props.onClickButton(
            pageUtil.convertToLabelFromNumber(props.pageInfo.number + 1)
          )
        }
      >
        <i className="fa fa-angle-double-right" />
      </li>
    );
  };

  return (
    <ul css={styles.contianer} className="page-numbers">
      {!props.pageInfo.first && <PrevButton />}
      {props.pageInfo.totalPages > 0 && <NumberButtons />}
      {!props.pageInfo.last && <NextButton />}
    </ul>
  );
};

export default Pagination;
