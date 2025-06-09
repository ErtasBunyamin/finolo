import API from "./api";

export const getCustomers = async () => {
    const res = await API.get("/customers");
    return res.data;
};

export const createCustomer = async (data) => {
    const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
    };
    const res = await API.post("/customers", payload);
    return res.data;
};
