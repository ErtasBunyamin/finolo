import api from "./api";

export const getInvoices = async () => {
    const res = await api.get("/invoices");
    return res.data;
};

export const createInvoice = async (data) => {
    const res = await api.post("/invoices", data);
    return res.data;
};

export const deleteInvoice = async (id) => {
    const res = await api.delete(`/invoices/${id}`);
    return res.data;
};

export const getInvoiceById = async (id) => {
    const res = await api.get(`/invoices/${id}`);
    return res.data;
};

export const updateInvoice = async (id, data) => {
    const res = await api.put(`/invoices/${id}`, data);
    return res.data;
};

export const exportInvoicesPdf = async () => {
    return api.get('/invoices/export/pdf', { responseType: 'blob' });
};

export const exportInvoicesExcel = async () => {
    return api.get('/invoices/export/excel', { responseType: 'blob' });
};


