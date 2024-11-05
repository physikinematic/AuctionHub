import { fetch } from "./helpers/fetch";

const prefix = 'user/';
const signInPath = `${prefix}signin`;
const signOutPath = `${prefix}signout`;
const signUpPath = `${prefix}signup`;
const allUsersPath = `${prefix}all`;

const all = () => {
  return fetch(allUsersPath);
}

const signIn = (data) => {
  return fetch(`${signInPath}?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`) 
}

const signOut = () => {
  return fetch(`${signOutPath}`) 
}

const signUp = (data) => {
  return fetch(`${signUpPath}?data=${data}`) 
}

const user = { all, signIn, signOut, signUp };

export { user };