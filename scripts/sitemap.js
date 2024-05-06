const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");
const cron = require("node-cron");

const date = new Date().toISOString();
const envs = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
};

let env;

try {
  fs.accessSync(
    path.resolve(__dirname, "../.env.production"),
    fs.constants.F_OK
  );

  env = envs.PRODUCTION;
} catch (error) {
  env = envs.DEVELOPMENT;
}

if (env === envs.PRODUCTION) {
  dotenv.config({ path: path.resolve(__dirname, "../.env.production") });
} else if (env === envs.DEVELOPMENT) {
  dotenv.config({ path: path.resolve(__dirname, "../.env.development") });
}

const getPosts = async () => {
  const response = await axios.get(
    `${process.env.BACKEND_SERVER_URI}/api/v1/posts`
  );

  return response.data;
};

const getPostsSiteMap = (posts) => {
  let siteMap = '<?xml version="1.0" encoding="UTF-8"?>';

  siteMap += `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${posts
        .map(
          (post) => `
            <url>
                <loc>${`${process.env.DOMAIN_URI}/posts/${post.id}`}</loc>
                <lastmod>${date}</lastmod>
            </url>
        `
        )
        .join("")}
    </urlset>
    `;

  return siteMap;
};

const writeSiteMapFile = (siteMap) => {
  fs.writeFileSync("./public/sitemap.xml", siteMap, "utf-8");
};

cron.schedule("0 0 4 * * *", async () => {
  const posts = await getPosts();
  const siteMap = getPostsSiteMap(posts);

  writeSiteMapFile(siteMap);
});
