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
import Prev from "./prev";
import Next from "./next";
import Page from "./page";

type Props = {
  pageInfo: PageInfo;
  onClickButton: (page: number) => void;
};

const Pagination = (props: Props) => {
  const numberButtonLength = PAGE_NUMBER_BUTTON_LENGTH;

  const pageUtil = new PageUtil();

  const pageNumbers: number[] = [];

  const firstPageNumber =
    Math.floor(props.pageInfo.number / numberButtonLength) * numberButtonLength;
  let lastPageNumber = firstPageNumber + numberButtonLength - 1;

  if (lastPageNumber > props.pageInfo.totalPages)
    lastPageNumber = pageUtil.convertToNumberFromLabel(
      props.pageInfo.totalPages
    );

  for (let i = firstPageNumber; i <= lastPageNumber; i++) {
    pageNumbers.push(i);
  }

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

  return (
    <ul css={styles.contianer}>
      <Prev
        disabled={props.pageInfo.first}
        onClick={() =>
          props.onClickButton(
            pageUtil.convertToLabelFromNumber(props.pageInfo.number - 1)
          )
        }
      />

      {pageNumbers.map((pageNumber) => (
        <Page
          key={pageNumber}
          value={pageUtil.convertToLabelFromNumber(pageNumber)}
          isActive={pageNumber === props.pageInfo.number}
          onClick={() =>
            props.onClickButton(pageUtil.convertToLabelFromNumber(pageNumber))
          }
        />
      ))}

      <Next
        disabled={props.pageInfo.last}
        onClick={() =>
          props.onClickButton(
            pageUtil.convertToLabelFromNumber(props.pageInfo.number + 1)
          )
        }
      />
    </ul>
  );
};

export default Pagination;
