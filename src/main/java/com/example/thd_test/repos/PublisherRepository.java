package com.example.thd_test.repos;

import com.example.thd_test.model.game.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
