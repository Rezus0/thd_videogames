package com.example.thd_test.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record UserDTO(
        @NotBlank
        String nickname,
        @Positive
        double balance,
        @Positive
        Long regTimeId,
        @NotBlank
        String country
) {
}
