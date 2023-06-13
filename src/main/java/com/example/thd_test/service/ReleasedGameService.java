package com.example.thd_test.service;

import com.example.thd_test.dto.relations.ReleasedGameDTO;
import com.example.thd_test.model.relations.ReleasedGame;
import com.example.thd_test.repos.ReleasedGameRepository;
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
public class ReleasedGameService {
    private final ReleasedGameRepository releasedGameRepository;
    private final GameService gameService;
    private final PublisherService publisherService;
    private final DeveloperService developerService;
    private final DateService dateService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<ReleasedGame> findAllReleasedGames() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return releasedGameRepository.findAll(byId);
    }

    public List<ReleasedGame> findByParams(
            Long gameId, Long pubId, Long devId, Long dateId
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ReleasedGame> query = cb.createQuery(ReleasedGame.class);
        Root<ReleasedGame> root = query.from(ReleasedGame.class);
        List<Predicate> predicates = new ArrayList<>();
        if (gameId != null) {
            predicates.add(cb.equal(root.get("game"), gameId));
        }
        if (pubId != null) {
            predicates.add(cb.equal(root.get("publisher"), pubId));
        }
        if (devId != null) {
            predicates.add(cb.equal(root.get("developer"), devId));
        }
        if (dateId != null) {
            predicates.add(cb.equal(root.get("date"), dateId));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(ReleasedGameDTO releasedGameDTO) {
        ReleasedGame newGame = ReleasedGame.builder()
                .game(gameService.getGame(releasedGameDTO.gameId()))
                .publisher(publisherService.getPublisher(releasedGameDTO.pubId()))
                .developer(developerService.getDeveloper(releasedGameDTO.devId()))
                .date(dateService.getDate(releasedGameDTO.dateId()))
                .build();
        releasedGameRepository.save(newGame);
    }

    public void delete(Long id) {
        releasedGameRepository.deleteById(id);
    }

    public ReleasedGame getReleasedGame(Long id) {
        return releasedGameRepository.findById(id).orElseThrow();
    }

    public void update(Long id, ReleasedGameDTO releasedGameDTO) {
        ReleasedGame game = getReleasedGame(id);
        game.setGame(gameService.getGame(releasedGameDTO.gameId()));
        game.setDeveloper(developerService.getDeveloper(releasedGameDTO.devId()));
        game.setPublisher(publisherService.getPublisher(releasedGameDTO.pubId()));
        game.setDate(dateService.getDate(releasedGameDTO.dateId()));
        releasedGameRepository.save(game);
    }

}
