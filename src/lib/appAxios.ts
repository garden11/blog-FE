import axios from "axios";

export const appAxios = () => {
  const appAxios = axios.create();

  /**
   * 서버 측에서 호출 시 process.env.BACKEND_SERVER_URI 값이 있으므로 baseURL 적용
   * 클라이언트 측에서 호출 시 적용되지 않음
   */
  process.env.BACKEND_SERVER_URI &&
    (appAxios.defaults.baseURL = process.env.BACKEND_SERVER_URI);

  return appAxios;
};

export default appAxios;
