import * as yup from "yup";

export const updatePasswordFormSchema = yup.object({
  password: yup
    .string()
    .required("비밀번호가 입력되지 않았습니다.")
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(12, "비밀번호는 12자를 초과할 수 없습니다."),
  newPassword: yup
    .string()
    .required("비밀번호가 입력되지 않았습니다.")
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(12, "비밀번호는 12자를 초과할 수 없습니다."),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "비밀번호가 일치하지 않습니다."),
});
export type UpdatePasswordFormValues = yup.InferType<
  typeof updatePasswordFormSchema
>;

export const resetPasswordFormSchema = yup.object({
  password: yup
    .string()
    .required("비밀번호가 입력되지 않았습니다.")
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(12, "비밀번호는 12자를 초과할 수 없습니다."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
});
export type ResetPasswordFormValues = yup.InferType<
  typeof resetPasswordFormSchema
>;
