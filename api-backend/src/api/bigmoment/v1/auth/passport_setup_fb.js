const passport = require('passport');
const {UserRepository} = require('../../../../database/user/user.repo');
const FacebookStrategy = require('passport-facebook').Strategy;
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
passport.use(new FacebookStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:3001/api/bigmoment/v1/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, function (accessToken, refreshToken, profile, done) {
    const userRepo = new UserRepository();
    const user = await userRepo.getUserOfProjectByGoogleId(1,profile.id);
      if(user){
        done(null,user);
      }
      else {
         const data = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          facebook_id:profile.id,
          project_id:1,
          password:""
         }
         const result = await userRepo.insertUser(data);
         done(null,result);
      }
  }
));