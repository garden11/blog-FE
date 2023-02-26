import * as yup from "yup";

export const emailFormSchema = yup.object({
  email: yup
    .string()
    .required("이메일이 입력되지 않았습니다.")
    .email("이메일 형식이 올바르지 않습니다.")
    .min(6, "이메일은 6자 이상이어야 합니다.")
    .max(30, "이메일은 30자를 초과할 수 없습니다."),
});
export type EmailFormValues = yup.InferType<typeof emailFormSchema>;
