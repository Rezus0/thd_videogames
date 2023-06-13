package com.example.thd_test.repos;

import com.example.thd_test.model.relations.ReleasedGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReleasedGameRepository extends JpaRepository<ReleasedGame, Long> {
    Optional<ReleasedGame> findReleasedGameByGame_Id(Long id);
}
