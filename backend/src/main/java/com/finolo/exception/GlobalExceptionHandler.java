package com.finolo.exception;

import com.finolo.dto.common.BaseResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // DTO @Valid hataları (alan bazlı)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse<Map<String, String>>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        logger.error("Validation error: {}", errors, ex);

        return ResponseEntity.badRequest().body(
                BaseResponse.<Map<String, String>>builder()
                        .success(false)
                        .message("Validasyon hatası")
                        .data(errors)
                        .build()
        );
    }

    // Servis içi manuel hata fırlatmaları
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BaseResponse<Void>> handleRuntime(RuntimeException ex) {
        logger.error("Runtime exception: {}", ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(BaseResponse.error(ex.getMessage()));
    }

    // Diğer her şey (beklenmeyen hata)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse<Map<String, Object>>> handleGeneral(Exception ex) {
        logger.error("Unexpected error", ex);
        Map<String, Object> detail = Map.of(
                "timestamp", LocalDateTime.now(),
                "detail", ex.getMessage()
        );
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        BaseResponse.<Map<String, Object>>builder()
                                .success(false)
                                .message("Sunucu hatası")
                                .data(detail)
                                .build()
                );
    }
}
