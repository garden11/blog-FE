import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Provider } from "react-redux";
import { wrapper } from "src/store";
import { Session } from "next-auth";

// components
import ReissueTokensHandler from "src/components/shared/handler/ReissueTokensHandler";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
  ...restProps
}: AppProps<{ session: Session }>) => {
  const { store } = wrapper.useWrappedStore({
    ...pageProps,
    ...restProps,
  });

  const [sessionInterval, setSessionInterval] = useState(0);

  return (
    <SessionProvider session={session} refetchInterval={sessionInterval}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ReissueTokensHandler setSessionInterval={setSessionInterval} />
      </Provider>
    </SessionProvider>
  );
};

export default App;
