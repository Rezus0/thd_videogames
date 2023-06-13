package com.example.thd_test.dto.game;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record GameDTO(
        @NotBlank
        String gameTitle,
        @NotBlank
        String genre,
        @Min(value = 0)
        @Max(value = 100)
        int score,
        @Positive
        Long minReqId,
        @Positive
        Long recReqId
) {
}
