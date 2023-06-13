package com.example.thd_test.service;

import com.example.thd_test.dto.relations.ReleasedGameDTO;
import com.example.thd_test.dto.user.UserGameDataDTO;
import com.example.thd_test.model.relations.ReleasedGame;
import com.example.thd_test.model.user.UserGameData;
import com.example.thd_test.repos.UserGameDataRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserGameDataService {
    private final UserGameDataRepository dataRepository;
    private final UserService userService;
    private final GameService gameService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<UserGameData> findAllData() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return dataRepository.findAll(byId);
    }

    public List<UserGameData> findByParams(
            Long userId, Long gameId, Integer level, Double playtime
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserGameData> query = cb.createQuery(UserGameData.class);
        Root<UserGameData> root = query.from(UserGameData.class);
        List<Predicate> predicates = new ArrayList<>();
        if (userId != null) {
            predicates.add(cb.equal(root.get("user"), userId));
        }
        if (gameId != null) {
            predicates.add(cb.equal(root.get("game"), gameId));
        }
        if (level != null) {
            predicates.add(cb.equal(root.get("level"), level));
        }
        if (playtime != null) {
            predicates.add(cb.equal(root.get("playtime"), playtime));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(UserGameDataDTO dataDTO) {
        UserGameData data = UserGameData.builder()
                .game(gameService.getGame(dataDTO.gameId()))
                .user(userService.getUser(dataDTO.userId()))
                .level(dataDTO.level())
                .playtime(dataDTO.playtime())
                .build();
        dataRepository.save(data);
    }

    public void delete(Long id) {
        dataRepository.deleteById(id);
    }

    public UserGameData getData(Long id) {
        return dataRepository.findById(id).orElseThrow();
    }

    public void update(Long id, UserGameDataDTO dataDTO) {
        UserGameData data = getData(id);
        data.setGame(gameService.getGame(dataDTO.gameId()));
        data.setUser(userService.getUser(dataDTO.userId()));
        data.setLevel(dataDTO.level());
        data.setPlaytime(dataDTO.playtime());
        dataRepository.save(data);
    }
}
