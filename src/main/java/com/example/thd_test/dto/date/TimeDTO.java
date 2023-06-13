package com.example.thd_test.dto.date;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;


public record TimeDTO(
        @Max(value = 23)
        @Min(value = 0)
        int hour,
        @Max(value = 59)
        @Min(value = 0)
        int minute,
        @Positive
        Long dateId
) {
}
