package com.example.thd_test.dto;

import jakarta.validation.constraints.NotBlank;

public record StoreDTO(
        @NotBlank
        String storeTitle,
        @NotBlank
        String country
) {
}
