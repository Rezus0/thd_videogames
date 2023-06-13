package com.example.thd_test.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record UserGameDataDTO(
        @Positive
        Long userId,
        @Positive
        Long gameId,
        @Positive
        int level,
        @Positive
        double playtime
) {
}
