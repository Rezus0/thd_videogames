package com.example.thd_test.repos;

import com.example.thd_test.model.user.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
