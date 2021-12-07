import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/database/mongodb"

const logWithColor = (message, name) => {
  // console.log(`${name}:`, message)
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),


    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    // })
  ],
  events: {
    async signIn(message) {
     logWithColor(message, 'signIn:')
    },
    async signOut(message) {
      logWithColor(message, 'signOut:')
    },
    async createUser(message) {
      logWithColor(message, 'createUser:')
    },
    async updateUser(message) {
      logWithColor(message, 'updateUser:')
    },
    async linkAccount(message) {
      logWithColor(message, 'linkAccount:')
    },
    async session(message) {
      logWithColor(message, 'session:')
    },
    async error(message) {
      logWithColor(message, 'error:')
    }
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true
  //   },
  //   async session({ session, user, token }) {
  //     return session
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token
  //   }
  // },
  // debug: true,
})