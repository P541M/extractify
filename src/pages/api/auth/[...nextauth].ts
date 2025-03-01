// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: { params: { scope: "read:user repo" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Store the GitHub user ID in the token
      if (profile) {
        token.githubUserId = profile.id;
      }

      // Add GitHub access token to the JWT
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      // Add the GitHub access token to the session
      session.accessToken = token.accessToken as string | undefined;

      // Add the GitHub user ID to the session
      session.githubUserId = token.githubUserId;

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
