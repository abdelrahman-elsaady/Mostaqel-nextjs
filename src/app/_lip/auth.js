import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import axios from 'axios'
import jwt from 'jsonwebtoken' 
import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
export const { handlers:{GET,POST}, auth, signIn, signOut } = NextAuth({
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  })],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const { email, name, image } = user;
        try {

          const response = await axios.post(`${process.env.BASE_URL}/users`, {
            email: email,
            firstName: name,
            profilePicture: image,
          });

          let userId;
          if (response.data.message == 'user saved successfully') {
            console.log('User data saved successfully');
            console.log(response.data.user)
            userId = response.data.user._id;
          } else if (response.data.message == 'Email already exists') {
            const user = await axios.get(`${process.env.BASE_URL}/users/email`, {
              data: { email: email },
              headers: { 'Content-Type': 'application/json' }
            });

            console.log(user.data.user._id); 
            userId = user.data.user._id;
          } else {
            return false; 
          }

          const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
          cookies().set('token', token)

          user.redirectUrl = response.data.message == 'Email already exists' ? '/' : '/account/profile';
          console.log(user.redirectUrl)

          return user.redirectUrl
        } catch (error) {
          console.error("Error saving user to database:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {

      // session.token = user.token;
      // return session;
    },
  },
  pages: {}
})