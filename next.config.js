const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `/api/auth/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_SERVER_URI}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
