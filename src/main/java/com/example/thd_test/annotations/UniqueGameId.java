package com.example.thd_test.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueGameIdValidator.class)
public @interface UniqueGameId {
    String message() default "Game with the same ID already exists";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

