import CredentialsProvider from "next-auth/providers/credentials";
import { getRefreshToken, login } from "../services/auth.service";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Name" },
        password: { label: "Password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const { email, password } = credentials;

        const data = await login({ email, password });
        if (!data) return null;

        return { id: crypto.randomUUID(), ...data };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session) {
        token = session;
        return token;
      }

      if (user) token = { ...token, ...user };
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessTokenExpiresAt = token.accessTokenExpiresAt;
        session.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
        session.nextStep = token.nextStep;
      }

      if (
        session.accessToken &&
        new Date(session.accessTokenExpiresAt).getTime() < new Date().getTime()
      ) {
        const data = await getRefreshToken(session.refreshToken);
        if (data) {
          session.accessToken = data.accessToken;
          session.accessTokenExpiresAt = data.accessTokenExpiresAt;
        } else {
          console.warn("Unable to refresh token");
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/",
    error: "/login",
  },
};

export default authOptions;
