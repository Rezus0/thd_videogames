package com.example.thd_test.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record PurchaseDTO(
        @Positive
        Long soldGameId,
        @Positive
        Long userId,
        @Positive
        Long timeId
) {
}
