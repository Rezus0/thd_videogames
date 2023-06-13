package com.example.thd_test.repos;

import com.example.thd_test.model.user.UserAuthData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthDataRepository extends JpaRepository<UserAuthData, Long> {
}
