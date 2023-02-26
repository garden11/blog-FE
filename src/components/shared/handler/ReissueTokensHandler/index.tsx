import { useSession } from "next-auth/react";
import { useEffect, Dispatch, SetStateAction } from "react";

// utils
import DateUtil from "src/utils/DateUtil";

type Props = {
  setSessionInterval: Dispatch<SetStateAction<number>>;
};

const RefreshTokenHandler = (props: Props) => {
  const { data: session } = useSession();

  const dateUtil = new DateUtil();

  useEffect(() => {
    if (!session) return;

    const nowAt = dateUtil.createUtcUnixString();
    const accessTokenExpiresAt = session.accessTokenExpiresAt;
    const secondsRemaining = Number(accessTokenExpiresAt) - Number(nowAt);

    props.setSessionInterval(secondsRemaining > 0 ? secondsRemaining : 0);
  }, [session]);

  return null;
};

export default RefreshTokenHandler;
