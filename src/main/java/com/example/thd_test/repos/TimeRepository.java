package com.example.thd_test.repos;

import com.example.thd_test.model.date.Time;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeRepository extends JpaRepository<Time, Long> {
}
