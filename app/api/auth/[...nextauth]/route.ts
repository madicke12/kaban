// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import env from "@/app/env";

const prisma = new PrismaClient();

export const authOption = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }:{url:String,baseUrl:String}) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    session: ({ session, token , user}:any) => ({
      ...session,
      user
    }),
  },
};

const handler = NextAuth(authOption);

export { handler as GET };
export { handler as POST };
