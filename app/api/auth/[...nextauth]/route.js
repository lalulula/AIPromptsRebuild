// Within this file, we can set up the providers, such as googl authentication
// Good practice for NextJS API Routes/Backend End Points handled in the frontend side
//every nextJS route is a serverless route: which means that it is a lambda function that will run only when called
// -> It will be connected to the DB everytime that it is called : 서버를 사용하진 않지만 연결을 안하면 안된다는거 ^^;;
// @utils/database.js will handle the DB connection
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Get data about a user everytime to keep existing and running session
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        // If not create and add it to db
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
