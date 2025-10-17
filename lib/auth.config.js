import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      // If your environment variable is named differently than default
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@myvisionboard.life",
    }),
    // Credentials({
    //   credentials: {
    //     email: {
    //       type: "email",
    //       label: "Email",
    //       placeholder: "johndoe@gmail.com",
    //     },
    //     password: {
    //       type: "password",
    //       label: "Password",
    //       placeholder: "*****",
    //     },
    //   },
    // }),
  ],
};
