import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", //Sign in page
  },
});

export const config = {
  matcher: ["/users/:path*", "/conversations/:path*"],
};
