package com.finolo.controller.invoice;

import com.finolo.dto.common.BaseResponse;
import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.service.invoice.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<BaseResponse<InvoiceResponse>> create(@Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.ok(
                BaseResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("success")
                        .data(invoiceService.create(request)).build());
    }

    @GetMapping
    public ResponseEntity<BaseResponse<List<InvoiceResponse>>> getAll() {
        return ResponseEntity.ok(
                BaseResponse.<List<InvoiceResponse>>builder()
                        .success(true)
                        .message("success")
                        .data(invoiceService.getAll()).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse<Void>> deleteInvoice(@PathVariable Long id) throws AccessDeniedException {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.ok(
                BaseResponse.<Void>builder()
                        .success(true)
                        .message("success").build());
    }

}
