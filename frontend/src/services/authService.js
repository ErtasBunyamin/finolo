import API from "./api";

export const loginRequest = async (credentials) => {
    const response = await API.post("/auth/login", credentials);
    return response.data;
};

export const registerRequest = async (data) => {
    const response = await API.post("/auth/register", data);
    return response.data;
};

export const getProfile = async () => {
    const res = await API.get("/user/me");
    return res.data;
};
