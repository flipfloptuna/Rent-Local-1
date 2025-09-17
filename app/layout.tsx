// lib/auth.ts (NextAuth v4)
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.email) {
        session.user = { ...session.user, email: String(token.email) };
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};
