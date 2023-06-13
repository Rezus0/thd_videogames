package com.example.thd_test.service;

import com.example.thd_test.dto.game.GameDTO;
import com.example.thd_test.model.game.Game;
import com.example.thd_test.model.game.SystemRequirement;
import com.example.thd_test.model.relations.ReleasedGame;
import com.example.thd_test.repos.GameRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final SystemRequirementService requirementService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Game> findAllGames() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return gameRepository.findAll(byId);
    }

    public List<Game> findByParams(
            String gameTitle, String genre, Integer score,
            Long minReqId, Long recReqId, Integer requiredSpace, Integer year
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Game> query = cb.createQuery(Game.class);
        Root<ReleasedGame> root = query.from(ReleasedGame.class);
        Join<ReleasedGame, Game> gameJoin = root.join("game", JoinType.RIGHT);
        Join<ReleasedGame, Date> dateJoin = root.join("date", JoinType.LEFT);
        Join<Game, SystemRequirement> reqJoin = gameJoin.join("minReq", JoinType.LEFT);
        List<Predicate> predicates = new ArrayList<>();
        if (gameTitle != null) {
            predicates.add(cb.equal(gameJoin.get("gameTitle"), gameTitle));
        }
        if (genre != null) {
            predicates.add(cb.equal(gameJoin.get("genre"), genre));
        }
        if (score != null) {
            predicates.add(cb.equal(gameJoin.get("score"), score));
        }
        if (minReqId != null) {
            predicates.add(cb.equal(gameJoin.get("minReq"), minReqId));
        }
        if (recReqId != null) {
            predicates.add(cb.equal(gameJoin.get("recReq"), recReqId));
        }
        if (requiredSpace != null) {
            predicates.add(cb.equal(reqJoin.get("requiredSpace"), requiredSpace));
        }
        if (year != null) {
            predicates.add(cb.equal(dateJoin.get("year"), year));
        }
        query.select(gameJoin).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(gameJoin.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(GameDTO gameDTO) {
        Game newGame = Game.builder()
                .gameTitle(gameDTO.gameTitle())
                .genre(gameDTO.genre())
                .score(gameDTO.score())
                .minReq(requirementService.getReq(gameDTO.minReqId()))
                .recReq(requirementService.getReq(gameDTO.recReqId()))
                .build();
        gameRepository.save(newGame);
    }

    public void delete(Long id) {
        gameRepository.deleteById(id);
    }

    public Game getGame(Long id) {
        return gameRepository.findById(id).orElseThrow();
    }

    public void update(Long id, GameDTO gameDTO) {
        Game game = getGame(id);
        game.setGameTitle(gameDTO.gameTitle());
        game.setGenre(gameDTO.genre());
        game.setScore(gameDTO.score());
        game.setMinReq(requirementService.getReq(gameDTO.minReqId()));
        game.setRecReq(requirementService.getReq(gameDTO.recReqId()));
        gameRepository.save(game);
    }
}
