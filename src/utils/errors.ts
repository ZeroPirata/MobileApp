export const erroLogs = (valueOfError: any) => {
  let erroLog = "";
  if (valueOfError === "auth/email-already-in-use") {
    return (erroLog = "Email is already in use");
  }
  if (valueOfError === "auth/account-exists-with-different-credential") {
    return (erroLog =
      "Email already exists with another login method. \nMethods: Facebook, Google, Email/Password");
  }
  if (valueOfError === "auth/weak-password") {
    return (erroLog = "Enter a password with at least 6 characters");
  }
};
