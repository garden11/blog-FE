export default class PageUtil {
  convertToNumberFromLabel = (pageLabel: number): number => pageLabel - 1;

  convertToLabelFromNumber = (pageNumber: number): number => pageNumber + 1;
}
