import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap"
          rel="stylesheet"
        />
        {/** Bootstrap core CSS */}
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css" />
        {/** Additional CSS  */}
        <link rel="stylesheet" href="/assets/css/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/blog.css" />
        <link rel="stylesheet" href="/assets/css/owl.css" />
        <link rel="stylesheet" href="/assets/css/auth.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/** Bootstrap core JavaScript */}
        <script src="/vendor/jquery/jquery.min.js" />
        <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" />
        {/** Additional Scripts */}
        <script src="/assets/js/custom.js" />
        <script src="/assets/js/owl.js" />
        <script src="/assets/js/slick.js" />
        <script src="/assets/js/isotope.js" />
        <script src="/assets/js/accordions.js" />
      </body>
    </Html>
  );
};

export default Document;
