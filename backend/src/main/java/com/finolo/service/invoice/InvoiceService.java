package com.finolo.service.invoice;

import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.mapper.InvoiceMapper;
import com.finolo.model.Customer;
import com.finolo.model.Invoice;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDate;
import java.util.List;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final CustomerRepository customerRepository;

    public InvoiceResponse create(InvoiceRequest request) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı"));

        String invoiceNumber = "INV-" + System.currentTimeMillis();
        double taxRate = request.getTaxRate() != null ? request.getTaxRate() : 0.0;
        Double totalWithTax = request.getAmount() * (1 + (taxRate / 100.0));

        Invoice invoice = Invoice.builder()
                .date(request.getDate())
                .amount(request.getAmount())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status(request.getStatus())
                .invoiceNumber(invoiceNumber)
                .taxRate(taxRate)
                .totalWithTax(totalWithTax)
                .note(request.getNote())
                .paymentMethod(request.getPaymentMethod())
                .createdAt(LocalDate.now())
                .customer(customer)
                .user(currentUser)
                .build();

        invoiceRepository.save(invoice);

        return InvoiceResponse.builder()
                .id(invoice.getId())
                .amount(invoice.getAmount())
                .date(invoice.getDate())
                .description(invoice.getDescription())
                .customerId(customer.getId())
                .customerName(customer.getName())
                .invoiceNumber(invoice.getInvoiceNumber())
                .status(invoice.getStatus())
                .dueDate(invoice.getDueDate())
                .createdAt(invoice.getCreatedAt())
                .updatedAt(invoice.getUpdatedAt())
                .taxRate(invoice.getTaxRate())
                .totalWithTax(invoice.getTotalWithTax())
                .note(invoice.getNote())
                .paymentMethod(invoice.getPaymentMethod())
                .build();
    }

    public List<InvoiceResponse> getAll() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return invoiceRepository.findByUser(currentUser).stream()
                .map(invoice -> InvoiceResponse.builder()
                        .id(invoice.getId())
                        .amount(invoice.getAmount())
                        .date(invoice.getDate())
                        .description(invoice.getDescription())
                        .customerId(invoice.getCustomer().getId())
                        .customerName(invoice.getCustomer().getName())
                        .invoiceNumber(invoice.getInvoiceNumber())
                        .status(invoice.getStatus())
                        .dueDate(invoice.getDueDate())
                        .createdAt(invoice.getCreatedAt())
                        .updatedAt(invoice.getUpdatedAt())
                        .taxRate(invoice.getTaxRate())
                        .totalWithTax(invoice.getTotalWithTax())
                        .note(invoice.getNote())
                        .paymentMethod(invoice.getPaymentMethod())
                        .build())
                .toList();
    }

    public void deleteInvoice(Long id) throws AccessDeniedException {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı"));

        if (!invoice.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bu faturayı silme yetkiniz yok.");
        }

        invoiceRepository.delete(invoice);
    }

    public InvoiceResponse getInvoiceById(Long id) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı"));

        if (!invoice.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Bu faturaya erişiminiz yok.");
        }

        return invoiceMapper.toResponse(invoice);
    }

    public InvoiceResponse updateInvoice(Long id, InvoiceRequest request) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı"));

        if (!invoice.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Bu faturayı güncelleme yetkiniz yok.");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı"));

        invoice.setDate(request.getDate());
        invoice.setAmount(request.getAmount());
        invoice.setDescription(request.getDescription());
        invoice.setStatus(request.getStatus());
        invoice.setCustomer(customer);

        Invoice updated = invoiceRepository.save(invoice);
        return invoiceMapper.toResponse(updated);
    }

    public byte[] exportInvoicesToPdf() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Invoice> invoices = invoiceRepository.findByUser(currentUser);
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();
            PdfPTable table = new PdfPTable(5);
            table.addCell("Invoice No");
            table.addCell("Customer");
            table.addCell("Date");
            table.addCell("Amount");
            table.addCell("Status");
            for (Invoice invoice : invoices) {
                table.addCell(invoice.getInvoiceNumber());
                table.addCell(invoice.getCustomer().getName());
                table.addCell(invoice.getDate().toString());
                table.addCell(String.valueOf(invoice.getAmount()));
                table.addCell(invoice.getStatus());
            }
            document.add(table);
            document.close();
            return out.toByteArray();
        } catch (DocumentException | IOException e) {
            throw new RuntimeException("PDF oluşturulamadı", e);
        }
    }

    public byte[] exportInvoicesToExcel() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Invoice> invoices = invoiceRepository.findByUser(currentUser);
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Invoices");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Invoice No");
            header.createCell(1).setCellValue("Customer");
            header.createCell(2).setCellValue("Date");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("Status");

            int rowIdx = 1;
            for (Invoice inv : invoices) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(inv.getInvoiceNumber());
                row.createCell(1).setCellValue(inv.getCustomer().getName());
                row.createCell(2).setCellValue(inv.getDate().toString());
                row.createCell(3).setCellValue(inv.getAmount());
                row.createCell(4).setCellValue(inv.getStatus());
            }
            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Excel oluşturulamadı", e);
        }
    }

}
