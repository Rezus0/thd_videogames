package com.example.thd_test.annotations;

import jakarta.validation.constraints.NotBlank;
import org.springframework.core.annotation.AliasFor;
import org.springframework.stereotype.Component;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RUNTIME)
@NotBlank
@Component
public @interface Blankless {
    @AliasFor(annotation = NotBlank.class)
    String message() default "{jakarta.validation.constraints.NotBlank.message}";
}
