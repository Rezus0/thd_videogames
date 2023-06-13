package com.example.thd_test.service;

import com.example.thd_test.dto.relations.SoldGameDTO;
import com.example.thd_test.model.relations.SoldGame;
import com.example.thd_test.repos.SoldGameRepository;
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
public class SoldGameService {
    private final SoldGameRepository soldGameRepository;
    private final StoreService storeService;
    private final GameService gameService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<SoldGame> findAllSoldGames() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return soldGameRepository.findAll(byId);
    }

    public List<SoldGame> findByParams(
            Long gameId, Long storeId, Double price
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<SoldGame> query = cb.createQuery(SoldGame.class);
        Root<SoldGame> root = query.from(SoldGame.class);
        List<Predicate> predicates = new ArrayList<>();
        if (gameId != null) {
            predicates.add(cb.equal(root.get("game"), gameId));
        }
        if (storeId != null) {
            predicates.add(cb.equal(root.get("store"), storeId));
        }
        if (price != null) {
            predicates.add(cb.equal(root.get("price"), price));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(SoldGameDTO soldGameDTO) {
        SoldGame newGame = SoldGame.builder()
                .game(gameService.getGame(soldGameDTO.gameId()))
                .store(storeService.getStore(soldGameDTO.storeId()))
                .price(soldGameDTO.price())
                .build();
        soldGameRepository.save(newGame);
    }

    public void delete(Long id) {
        soldGameRepository.deleteById(id);
    }

    public SoldGame getSoldGame(Long id) {
        return soldGameRepository.findById(id).orElseThrow();
    }

    public void update(Long id, SoldGameDTO soldGameDTO) {
        SoldGame game = getSoldGame(id);
        game.setGame(gameService.getGame(soldGameDTO.gameId()));
        game.setStore(storeService.getStore(soldGameDTO.storeId()));
        game.setPrice(soldGameDTO.price());
        soldGameRepository.save(game);
    }

}
