import { _delete, post } from "./helpers/request";

const path = "/auth";

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

const account = { signIn, signOut, signUp, deleteAccount };

export { account };
