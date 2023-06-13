package com.example.thd_test.repos;

import com.example.thd_test.model.game.Developer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeveloperRepository extends JpaRepository<Developer, Long> {
}
