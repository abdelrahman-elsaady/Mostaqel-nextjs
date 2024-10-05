

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import sgMail from '@sendgrid/mail';

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GAUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRE,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account.provider === "google") {
//         // Here you can add custom logic, like saving the user to your database
//         // For now, we'll just send a thank you email
//         await sendThankYouEmail(user.email);
//       }
//       return true;
//     },
//   },
// });

// // async function sendThankYouEmail(email) {
// //   // Implement your email sending logic here
// //   // You can use a service like SendGrid, Mailgun, or AWS SES
// //   console.log(`Sending thank you email to ${email}`);
// // }


// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// async function sendThankYouEmail(email) {
//   const msg = {
//     to: email,
//     from: 'abodaelsheemy22@email.com', // Use the email address you verified with SendGrid
//     subject: 'شكراً لتسجيلك في موقعنا',
//     text: 'نشكرك على التسجيل في موقعنا. نتمنى لك تجربة ممتعة!',
//     html: '<strong>نشكرك على التسجيل في موقعنا. نتمنى لك تجربة ممتعة!</strong>',
//   };

//   try {
//     await sgMail.send(msg);
//     console.log(`Thank you email sent to ${email}`);
//   } catch (error) {
//     console.error('Error sending thank you email:', error);
//   }
// }


export {GET,POST} from '../../../_lip/auth';
