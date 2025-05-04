import API from "./api";

// Tüm faturaları getir
export const getInvoices = async () => {
    const res = await API.get("/invoices");
    return res.data.data;
};

// Yeni fatura oluştur
export const createInvoice = async (invoiceData) => {
    const res = await API.post("/invoices", invoiceData);
    return res.data.data;
};

export const deleteInvoice = async (id) => {
    return API.delete(`/invoices/${id}`);
};