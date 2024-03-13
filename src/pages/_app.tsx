import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Provider } from "react-redux";
import { wrapper } from "src/store";
import { Session } from "next-auth";
import { Global } from "@emotion/react";

// components
import ReissueTokensHandler from "src/components/system-design/handler/reissue-tokens-handler";

// styles
import { globalStyles } from "src/styles/global";

// types
import { Page } from "src/types/common";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
  ...restProps
}: AppProps<{ session: Session }> & { Component: Page }) => {
  const { store } = wrapper.useWrappedStore({
    ...pageProps,
    ...restProps,
  });

  const layout = Component.layout ?? ((page) => page);

  const [sessionInterval, setSessionInterval] = useState(0);

  return (
    <SessionProvider session={session} refetchInterval={sessionInterval}>
      <Provider store={store}>
        <Global styles={globalStyles} />
        {layout(<Component {...pageProps} />)}
        <ReissueTokensHandler setSessionInterval={setSessionInterval} />
      </Provider>
    </SessionProvider>
  );
};

export default App;
