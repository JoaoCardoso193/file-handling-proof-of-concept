import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "./fileUpload";

const SEED_USERNAME_1 = "meteorite";
const SEED_PASSWORD_1 = "password";

const SEED_USERNAME_2 = "meteorite_2";
const SEED_PASSWORD_2 = "password_2";

Meteor.startup(() => {
  // code to run on server at startup

  if (!Accounts.findUserByUsername(SEED_USERNAME_1)) {
    Accounts.createUser({
      username: SEED_USERNAME_1,
      password: SEED_PASSWORD_1,
    });
  }

  if (!Accounts.findUserByUsername(SEED_USERNAME_2)) {
    Accounts.createUser({
      username: SEED_USERNAME_2,
      password: SEED_PASSWORD_2,
    });
  }

  const user_1 = Accounts.findUserByUsername(SEED_USERNAME_1);
  const user_2 = Accounts.findUserByUsername(SEED_USERNAME_2);
});
