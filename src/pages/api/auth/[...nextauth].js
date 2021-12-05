import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/database/mongodb"

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
      console.log('\x1b[31m%s\x1b[0m', 'signIn:')
      console.log(message)},
    async signOut(message) {
      console.log('\x1b[31m%s\x1b[0m', 'signOut:')
      console.log(message)},
    async createUser(message) {
      console.log('\x1b[31m%s\x1b[0m', 'createUser:')
      console.log(message)},
    async updateUser(message) {
      console.log('\x1b[31m%s\x1b[0m', 'updateUser:')
      console.log(message)},
    async linkAccount(message) {
      console.log('\x1b[31m%s\x1b[0m', 'linkAccount:')
      console.log(message)},
    async session(message) {
      console.log('\x1b[31m%s\x1b[0m', 'session:')
      console.log(message)},
    async error(message) {
      console.log('\x1b[31m%s\x1b[0m', 'error:')
      console.log(message)}
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