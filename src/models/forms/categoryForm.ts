import * as yup from "yup";

export const categoryFormSchema = yup.object({
  id: yup.string(),
  name: yup
    .string()
    .required("카테고리 명이 입력되지 않았습니다.")
    .max(10, "카테고리 명은 10자를 초과할 수 없습니다."),
});
export type CategoryFormValues = yup.InferType<typeof categoryFormSchema>;
