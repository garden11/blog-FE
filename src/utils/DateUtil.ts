import moment from "moment";

const DATE_STRING_FORMAT = "YYYY-MM-DD HH:mm:ss";

export default class DateUtil {
  createUtcUnixString = (): string => String(moment.utc().unix());

  utcUnixStringToDateString = (utcUnixString: string): string => {
    const date = moment.unix(Number(utcUnixString));
    const dateString = date.format(DATE_STRING_FORMAT);

    return dateString;
  };
}
