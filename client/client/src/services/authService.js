import { api } from "./api";

export const login = async (data) => {
  //cred={email,password}

  const res = await api.post("api/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("api/register", data);
  return res.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
};
