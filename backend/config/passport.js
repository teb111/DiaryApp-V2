import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (acessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
