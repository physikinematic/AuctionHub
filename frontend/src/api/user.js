import { get, post, _delete } from "./helpers/request";

const mainPath = '/auth';

const getAll = async (page, limit) => {
  return await get({
    path: `${mainPath}/all`,
    query: { page, limit }
  });
}

const signIn = async (data) => {
  return await post({
    path: `${mainPath}/signin`,
    body: data
  });
}

const signOut = async () => {
  
}

const signUp = async (data) => {
  return await post({
    path: `${mainPath}/signup`,
    body: data
  });
}

const deleteUser = async (id) => {
  return await _delete({
    path: `${mainPath}/${id}`,
  });
}

const user = { getAll, signIn, signOut, signUp, deleteUser };

export { user };