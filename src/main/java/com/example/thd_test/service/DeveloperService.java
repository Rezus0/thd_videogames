package com.example.thd_test.service;

import com.example.thd_test.dto.game.DeveloperDTO;
import com.example.thd_test.dto.game.PublisherDTO;
import com.example.thd_test.model.Store;
import com.example.thd_test.model.game.Developer;
import com.example.thd_test.model.game.Game;
import com.example.thd_test.model.game.Publisher;
import com.example.thd_test.model.game.SystemRequirement;
import com.example.thd_test.model.relations.ReleasedGame;
import com.example.thd_test.model.relations.SoldGame;
import com.example.thd_test.repos.DeveloperRepository;
import com.example.thd_test.repos.PublisherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeveloperService {
    private final DeveloperRepository developerRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Developer> findByParams(
            String devTitle, String country, Integer devEmployeeNumber,
            Double price, String genre, Integer score, String storeTitle, Integer ram
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Developer> query = cb.createQuery(Developer.class);
        Root<SoldGame> root = query.from(SoldGame.class);
        Join<SoldGame, Store> storeJoin = root.join("store", JoinType.INNER);
        Join<SoldGame, Game> gameJoin = root.join("game", JoinType.INNER);
        Join<Game, SystemRequirement> reqJoin = gameJoin.join("recReq", JoinType.INNER);
        Join<Game, ReleasedGame> releasedGameJoin = gameJoin.join("release", JoinType.INNER);
        Join<ReleasedGame, Developer> developerJoin = releasedGameJoin.join("developer", JoinType.RIGHT);
        List<Predicate> predicates = new ArrayList<>();
        if (devTitle != null) {
            predicates.add(cb.equal(developerJoin.get("devTitle"), devTitle));
        }
        if (country != null) {
            predicates.add(cb.equal(developerJoin.get("country"), country));
        }
        if (devEmployeeNumber != null) {
            predicates.add(cb.equal(developerJoin.get("devEmployeeNumber"), devEmployeeNumber));
        }
        if (price != null) {
            predicates.add(cb.equal(root.get("price"), price));
        }
        if (genre != null) {
            predicates.add(cb.equal(gameJoin.get("genre"), genre));
        }
        if (score != null) {
            predicates.add(cb.equal(gameJoin.get("score"), score));
        }
        if (storeTitle != null) {
            predicates.add(cb.equal(storeJoin.get("storeTitle"), storeTitle));
        }
        if (ram != null) {
            predicates.add(cb.equal(reqJoin.get("ram"), ram));
        }
        query.select(developerJoin).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(developerJoin.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(DeveloperDTO devDTO) {
        Developer developer = Developer.builder()
                .devTitle(devDTO.devTitle())
                .country(devDTO.country())
                .devEmployeeNumber(devDTO.devEmployeeNumber())
                .build();
        developerRepository.save(developer);
    }

    public List<Developer> findAllDevs() {
        return developerRepository.findAll();
    }

    public Developer getDeveloper(Long id) {
        return developerRepository.findById(id).orElseThrow();
    }

    public void delete(Long id) {
        developerRepository.deleteById(id);
    }

    public void update(Long id, DeveloperDTO devDTO) {
        Developer developer = getDeveloper(id);
        developer.setDevTitle(devDTO.devTitle());
        developer.setCountry(devDTO.country());
        developer.setDevEmployeeNumber(devDTO.devEmployeeNumber());
        developerRepository.save(developer);
    }
}
