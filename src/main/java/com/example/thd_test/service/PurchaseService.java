package com.example.thd_test.service;

import com.example.thd_test.dto.user.PurchaseDTO;
import com.example.thd_test.model.user.Purchase;
import com.example.thd_test.repos.PurchaseRepository;
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
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final SoldGameService soldGameService;
    private final UserService userService;
    private final TimeService timeService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Purchase> findAllPurchases() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return purchaseRepository.findAll(byId);
    }

    public List<Purchase> findByParams(
            Long soldGameId, Long userId, Long timeId
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Purchase> query = cb.createQuery(Purchase.class);
        Root<Purchase> root = query.from(Purchase.class);
        List<Predicate> predicates = new ArrayList<>();
        if (soldGameId != null) {
            predicates.add(cb.equal(root.get("soldGame"), soldGameId));
        }
        if (userId != null) {
            predicates.add(cb.equal(root.get("user"), userId));
        }
        if (timeId != null) {
            predicates.add(cb.equal(root.get("time"), timeId));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(PurchaseDTO purchaseDTO) {
        Purchase purchase = Purchase.builder()
                .soldGame(soldGameService.getSoldGame(purchaseDTO.soldGameId()))
                .user(userService.getUser(purchaseDTO.userId()))
                .time(timeService.getTime(purchaseDTO.timeId()))
                .build();
        purchaseRepository.save(purchase);
    }

    public void delete(Long id) {
        purchaseRepository.deleteById(id);
    }

    private Purchase getReleasedGame(Long id) {
        return purchaseRepository.findById(id).orElseThrow();
    }

    public void update(Long id, PurchaseDTO purchaseDTO) {
        Purchase purchase = getReleasedGame(id);
        purchase.setSoldGame(soldGameService.getSoldGame(purchaseDTO.soldGameId()));
        purchase.setUser(userService.getUser(purchaseDTO.userId()));
        purchase.setTime(timeService.getTime(purchaseDTO.timeId()));
        purchaseRepository.save(purchase);
    }
}
