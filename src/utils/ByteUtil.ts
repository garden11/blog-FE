export default class ByteUtil {
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
