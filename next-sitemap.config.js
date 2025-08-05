/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://thrive-wellness.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/api/*", "/admin/*", "/settings/*", "/onboarding/*", "/(auth)/*"],
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/library"),
    await config.transform(config, "/dashboard"),
    await config.transform(config, "/habits"),
    await config.transform(config, "/analytics"),
    await config.transform(config, "/achievements"),
    await config.transform(config, "/bookmarks"),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/settings/", "/onboarding/", "/(auth)/"],
      },
    ],
  },
}
