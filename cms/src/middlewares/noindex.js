module.exports = () => {
  return async (ctx, next) => {
    await next();

    const isAdminRoute = ctx.path === "/admin" || ctx.path.startsWith("/admin/");
    const isApiRoute = ctx.path === "/api" || ctx.path.startsWith("/api/");

    if (isAdminRoute || isApiRoute) {
      ctx.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      ctx.set("Cache-Control", "private, no-store");
    }
  };
};
