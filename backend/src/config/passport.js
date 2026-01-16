import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/index.js";
import { randomAvatar } from "../utils/random-avatar.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            username: email.split("@")[0],
            avatar: randomAvatar(),
            googleId: profile.id,
            provider: "google",
            isVerified: true,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
// export default passport;
