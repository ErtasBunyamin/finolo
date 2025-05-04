import API from "./api";

export const getCustomers = async () => {
    const res = await API.get("/customers");
    return res.data;
};

export const createCustomer = async (data) => {
    const res = await API.post("/customers", data);
    return res.data;
};
