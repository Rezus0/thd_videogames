package com.example.thd_test.dto.relations;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record SoldGameDTO(
        @Positive
        Long gameId,
        @Positive
        Long storeId,
        @Min(value = 0)
        double price
) {
}
