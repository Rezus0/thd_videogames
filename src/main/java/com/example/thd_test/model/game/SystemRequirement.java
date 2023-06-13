package com.example.thd_test.model.game;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "system_requirements")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class SystemRequirement {
    @Id
    @GeneratedValue
    @Column(name = "req_id")
    private Long id;
    private String os;
    private int ram;
    private String gpu;
    private String processor;
    private int requiredSpace;
}
