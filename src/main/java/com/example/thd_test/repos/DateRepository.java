package com.example.thd_test.repos;

import com.example.thd_test.model.date.Date;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DateRepository extends JpaRepository<Date, Long> {
}
