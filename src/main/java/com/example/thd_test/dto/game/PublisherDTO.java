package com.example.thd_test.dto.game;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record PublisherDTO(
        @NotBlank(message = "pubTitle can't be blank")
        String pubTitle,
        @NotBlank(message = "country can't be blank")
        String country,
        @Positive
        int pubEmployeeNumber
) {
}