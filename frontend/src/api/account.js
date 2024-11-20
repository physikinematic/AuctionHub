import { _delete, get, post } from "./helpers/request";

const path = "/auth";

const getUserInfo = async () => {
  return await get({
    path: `${path}/info`,
  });
};

const signIn = async (data) => {
  return await post({
    path: `${path}/signin`,
    body: data,
  });
};

const signOut = async () => {
  return await post({
    path: `${path}/signout`,
  });
};

const signUp = async (data) => {
  return await post({
    path: `${path}/signup`,
    body: data,
  });
};

const deleteAccount = async (id) => {
  return await _delete({
    path: `${path}/${id}`,
  });
};

const account = { getUserInfo, signIn, signOut, signUp, deleteAccount };

export { account };
