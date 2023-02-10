export const GOOGLE_ID =
  "40662641916-572tlslogam9ifhmo6haa2vg527hns9u.apps.googleusercontent.com";
const REDRECT_URI = "https://auth.expo.io/@zeropirata/ZeroLeagueApp";
const SCOPE = encodeURI("profile email");
const RESPONSE_TYPE = "token";
export const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${REDRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
