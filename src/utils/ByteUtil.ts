export default class ByteUtil {
  /**
   * 참조: https://gist.github.com/mathiasbynens/1010324
   */
  getByteLengthOfUtf8String = (string: string): number => {
    let b: number, i: number, c: number;

    for (
      b = i = 0;
      (c = string.charCodeAt(i++));
      b += c >> 11 ? 3 : c >> 7 ? 2 : 1
    );

    return b;
  };
}
