import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
