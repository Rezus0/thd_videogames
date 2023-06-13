package com.example.thd_test.service;

import com.example.thd_test.dto.user.UserAuthDataDTO;
import com.example.thd_test.dto.user.UserGameDataDTO;
import com.example.thd_test.model.user.UserAuthData;
import com.example.thd_test.model.user.UserGameData;
import com.example.thd_test.repos.UserAuthDataRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAuthDataService {
    private final UserAuthDataRepository dataRepository;
    private final UserService userService;
    @PersistenceContext
    private final EntityManager entityManager;
    private final PasswordEncoder passwordEncoder;

    public List<UserAuthData> findAllData() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return dataRepository.findAll(byId);
    }

    public List<UserAuthData> findByParams(
            Long userId, String login, String password
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserAuthData> query = cb.createQuery(UserAuthData.class);
        Root<UserAuthData> root = query.from(UserAuthData.class);
        List<Predicate> predicates = new ArrayList<>();
        if (userId != null) {
            predicates.add(cb.equal(root.get("user"), userId));
        }
        if (login != null) {
            predicates.add(cb.equal(root.get("login"), login));
        }
        if (password != null) {
            Expression<String> encodedPassword = cb.function(
                    "crypt",
                    String.class,
                    cb.literal(password),
                    root.get("password")
            );
            predicates.add(cb.equal(encodedPassword, root.get("password")));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(UserAuthDataDTO dataDTO) {
        UserAuthData data = UserAuthData.builder()
                .user(userService.getUser(dataDTO.userId()))
                .login(dataDTO.login())
                .password(passwordEncoder.encode(dataDTO.password()))
                .build();
        dataRepository.save(data);
    }

    public void delete(Long id) {
        dataRepository.deleteById(id);
    }

    public UserAuthData getData(Long id) {
        return dataRepository.findById(id).orElseThrow();
    }

    public void update(Long id, UserAuthDataDTO dataDTO) {
        UserAuthData data = getData(id);
        data.setUser(userService.getUser(dataDTO.userId()));
        data.setLogin(dataDTO.login());
        data.setPassword(passwordEncoder.encode(dataDTO.password()));
        dataRepository.save(data);
    }
}
