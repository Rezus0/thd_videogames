package com.example.thd_test.repos;

import com.example.thd_test.endpoints.UserGameDataEndpoint;
import com.example.thd_test.model.user.UserGameData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGameDataRepository extends JpaRepository<UserGameData, Long> {
}
