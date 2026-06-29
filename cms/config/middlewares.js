module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : [],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "global::noindex",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
