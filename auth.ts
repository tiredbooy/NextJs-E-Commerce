import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.oauth_provider = account.provider;
        token.oauth_id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      session.oauth_provider = token.oauth_provider as string;
      session.oauth_id = token.oauth_id as string;
      return session;
    },
  },
});
