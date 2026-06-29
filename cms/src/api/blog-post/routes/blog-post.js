module.exports = {
  routes: [
    {
      method: "GET",
      path: "/blog-posts",
      handler: "blog-post.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/blog-posts/:documentId",
      handler: "blog-post.findOne",
      config: { auth: false },
    },
  ],
};
