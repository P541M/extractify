// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    githubUserId?: string | number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubUserId?: string | number;
    accessToken?: string;
  }
}
