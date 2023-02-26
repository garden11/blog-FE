import * as yup from "yup";

export const commentFormSchema = yup.object({
  content: yup
    .string()
    .required("내용은 필수 입력 항목입니다.")
    .max(150, "내용은 150자를 초과할 수 없습니다."),
});
export type CommentFormValues = yup.InferType<typeof commentFormSchema>;
