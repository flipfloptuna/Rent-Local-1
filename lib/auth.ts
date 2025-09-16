// lib/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = (profile as any).name || token.name;
        // keep email as stable user id
        // @ts-expect-error
        token.email = (profile as any).email || token.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email) {
        session.user = { ...session.user, email: String(token.email) };
      }
      return session;
    },
  },
});
