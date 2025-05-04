import API from "./api";

// Tüm faturaları getir
export const getInvoices = async () => {
    const res = await API.get("/invoices");
    return res.data;
};

// Yeni fatura oluştur
export const createInvoice = async (invoiceData) => {
    const res = await API.post("/invoices", invoiceData);
    return res.data;
};
