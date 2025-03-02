// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { Profile } from "next-auth";

// Add missing id property to Profile type
declare module "next-auth" {
  interface Profile {
    id?: string | number;
  }

  interface Session {
    accessToken?: string;
    githubUserId?: string;
  }
}

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      authorization: { params: { scope: "read:user repo" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Explicitly set JWT strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Store the GitHub user ID in the token
      if (profile && profile.id) {
        // Ensure the GitHub user ID is stored as a string
        token.githubUserId = profile.id.toString();
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
      session.githubUserId = token.githubUserId as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
