import api from "./api";

export const getDashboardSummary = async () => {
    const res = await api.get("/dashboard/summary");
    return res.data;
};

export const getRecentInvoices = async () => {
    const res = await api.get("/dashboard/recent");
    return res.data;
};

export const getMonthlyStats = async () => {
    const res = await api.get("/dashboard/monthly-stats");
    return res.data;
};

export const getPaymentStats = async () => {
    const res = await api.get("/dashboard/payment-stats");
    return res.data;
};

export const getRecentOperations = async () => {
    const res = await api.get("/dashboard/operations");
    return res.data;
};
