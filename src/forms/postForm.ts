import * as yup from "yup";

export const postFormSchema = yup.object({
  id: yup.string().required(),
  title: yup
    .string()
    .required("제목은 필수 입력 항목입니다.")
    .max(150, "제목은 150자를 초과할 수 없습니다."),
  content: yup.string().required("내용은 필수 입력 항목입니다."),
  contentByteLength: yup
    .number()
    .max(
      100000,
      (object) =>
        `내용은 10000bytes를 초과할 수 없습니다.(${object.value}bytes)`
    ),
  tags: yup.mixed<string[]>().test({
    name: "itemMaxLength",
    test: function (value: string[] | undefined) {
      if (!value) return true;

      for (const item of value) {
        if (item.length > 10) {
          return this.createError({
            message: "태그는 10자를 초과할 수 없습니다.",
          });
        }
      }

      return true;
    },
  }),
  registerYN: yup
    .string()
    .required()
    .oneOf(["Y", "N"] as const),
});
export type PostFormValues = yup.InferType<typeof postFormSchema>;
