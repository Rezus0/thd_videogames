package com.example.thd_test.annotations;

import com.example.thd_test.repos.ReleasedGameRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueGameIdValidator implements ConstraintValidator<UniqueGameId, Long> {

    @Autowired
    private ReleasedGameRepository releasedGameRepository;

    @Override
    public boolean isValid(Long gameId, ConstraintValidatorContext context) {
        if (gameId == null) {
            return true; // Skip validation if gameId is null
        }
        return releasedGameRepository.findReleasedGameByGame_Id(gameId).isEmpty();
    }
}
