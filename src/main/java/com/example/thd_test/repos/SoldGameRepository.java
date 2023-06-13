package com.example.thd_test.repos;

import com.example.thd_test.model.relations.SoldGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoldGameRepository extends JpaRepository<SoldGame, Long> {
}
