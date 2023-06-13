package com.example.thd_test.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record UserAuthDataDTO(
        @Positive
        Long userId,
        @NotBlank
        String login,
        @NotBlank
        String password
) {
}
