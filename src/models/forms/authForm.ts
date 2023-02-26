import * as yup from "yup";

// constants
import { ENGLISH_LOWERCASE_NUMBER_REGEX } from "src/constants";

export const signInformSchema = yup.object({
  username: yup
    .string()
    .required("아이디는 필수 입력 항목입니다.")
    .matches(ENGLISH_LOWERCASE_NUMBER_REGEX, "아이디는 영문 또는 숫자입니다.")
    .min(4, "아이디는 4자 이상이어야 합니다.")
    .max(12, "아이디는 12자를 초과할 수 없습니다."),
  password: yup
    .string()
    .required("비밀번호는 필수 입력 항목입니다.")
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(12, "비밀번호는 12자를 초과할 수 없습니다."),
});
export type SignInFormValues = yup.InferType<typeof signInformSchema>;

export const signUpformSchema = yup.object({
  username: yup
    .string()
    .required("아이디는 필수 입력 항목입니다.")
    .matches(ENGLISH_LOWERCASE_NUMBER_REGEX, "아이디는 영문 또는 숫자입니다.")
    .min(4, "아이디는 4자 이상이어야 합니다.")
    .max(12, "아이디는 12자를 초과할 수 없습니다."),
  email: yup
    .string()
    .required("이메일은 필수 입력 항목입니다.")
    .email("이메일 형식이 올바르지 않습니다.")
    .min(6, "이메일은 6자 이상이어야 합니다.")
    .max(30, "이메일은 30자를 초과할 수 없습니다."),
  password: yup
    .string()
    .required("비밀번호는 필수 입력 항목입니다.")
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(12, "비밀번호는 12자를 초과할 수 없습니다."),
  passwordConfirm: yup
    .string()
    .required("비밀번호 재확인은 필수 입력 항목입니다.")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
});
export type SignUpFormValues = yup.InferType<typeof signUpformSchema>;
