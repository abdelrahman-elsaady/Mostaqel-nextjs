/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true,
    env: {
      BASE_URL: process.env.BASE_URL,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    }};

export default nextConfig;

// const ss = {
//     reactStrictMode: true,
//     env: {
//       BASE_URL: process.env.BASE_URL,
//     }
//   }

  