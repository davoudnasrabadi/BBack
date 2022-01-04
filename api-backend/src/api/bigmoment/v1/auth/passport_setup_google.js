const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {UserRepository} = require('../../../../database/user/user.repo');

passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(async function(user_id, done) {
  const userRepo = new UserRepository();
  const user = await userRepo.getByID(user_id,1);
  if(user){
    done(null,user);
  }
  else{
    done({msg:"User not found"},null);
  }
});
passport.use(new GoogleStrategy({
  clientID: "563624289173-no5kpl96pa49n3947842vqkebr7amt5q.apps.googleusercontent.com",
  clientSecret: "yNNGjxLnPtTeRqX_l02ct_oR",
  callbackURL: "http://localhost:3001/api/bigmoment/v1/auth/google/callback"
  },
  async function(token, tokenSecret, profile, done) {
      const userRepo = new UserRepository();
      const user = await userRepo.getUserOfProjectByGoogleId(1,profile.id);
      if(user){
        done(null,user);
      }
      else {
         const data = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          google_id:profile.id,
          project_id:1,
          password:""
         }
         const result = await userRepo.insertUser(data);
         done(null,result);
      }
  }
));