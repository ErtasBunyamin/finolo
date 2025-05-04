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