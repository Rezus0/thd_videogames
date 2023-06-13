package com.example.thd_test.dto.relations;

import com.example.thd_test.annotations.UniqueGameId;
import jakarta.validation.constraints.Positive;

public record ReleasedGameDTO(
        @Positive
        @UniqueGameId
        Long gameId,
        @Positive
        Long pubId,
        @Positive
        Long devId,
        @Positive
        Long dateId
) {
}
