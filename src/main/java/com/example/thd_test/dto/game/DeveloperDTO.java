package com.example.thd_test.dto.game;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record DeveloperDTO(
        @NotBlank(message = "devTitle can't be blank")
        String devTitle,
        @NotBlank(message = "country can't be blank")
        String country,
        @Positive
        int devEmployeeNumber
) {
}
