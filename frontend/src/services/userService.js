import api from "./api";

export const updateUser = async (data) => {
  const res = await api.put("/user/me", data);
  return res.data;
};
