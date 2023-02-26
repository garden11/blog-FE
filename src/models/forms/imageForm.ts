import * as yup from "yup";

// constants
import { IMAGE_EXTENTION_REGEX } from "src/constants";

export const imageFormSchema = yup.object({
  image: yup
    .mixed<File>()
    .required("업로드된 파일이 없습니다.")
    .test({
      name: "extention",
      test: function (value: File) {
        if (IMAGE_EXTENTION_REGEX.test(value.name)) {
          return true;
        } else {
          return this.createError({
            message: "확장자명이 jpg, jpeg, png인 파일만 업로드할 수 있습니다.",
            path: this.path,
          });
        }
      },
    })
    .test({
      name: "size",
      test: function (value: File) {
        // 3MB
        if (value.size <= 3 * 1024 * 1024) {
          return true;
        } else {
          return this.createError({
            message: `3MB 이하 사이즈의 파일만 업로드할 수 있습니다.(${value.size})`,
            path: this.path,
          });
        }
      },
    }),
});
export type ImageFormValues = yup.InferType<typeof imageFormSchema>;
