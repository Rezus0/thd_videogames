package com.example.thd_test.dto.date;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record DateDTO(
        @Max(value = 31)
        @Min(value = 1)
        int day,
        @Max(value = 12)
        @Min(value = 1)
        int month,
        @Min(value = 1000)
        int year) {
}
