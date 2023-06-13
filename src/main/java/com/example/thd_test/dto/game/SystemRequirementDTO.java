package com.example.thd_test.dto.game;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record SystemRequirementDTO(
        @NotBlank
        String os,
        @Positive
        int ram,
        @NotBlank
        String gpu,
        @NotBlank
        String processor,
        @Positive
        int requiredSpace
) {
}
