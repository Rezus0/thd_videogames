package com.example.thd_test.service;

import com.example.thd_test.dto.StoreDTO;
import com.example.thd_test.model.Store;
import com.example.thd_test.repos.StoreRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Store> findByParams(
            String storeTitle, String country
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Store> query = cb.createQuery(Store.class);
        Root<Store> root = query.from(Store.class);
        List<Predicate> predicates = new ArrayList<>();
        if (storeTitle != null) {
            predicates.add(cb.equal(root.get("storeTitle"), storeTitle));
        }
        if (country != null) {
            predicates.add(cb.equal(root.get("country"), country));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(StoreDTO storeDTO) {
        Store store = Store.builder()
                .country(storeDTO.country())
                .storeTitle(storeDTO.storeTitle())
                .build();
        storeRepository.save(store);
    }

    public List<Store> findAllStores() {
        return storeRepository.findAll();
    }

    public Store getStore(Long id) {
        return storeRepository.findById(id).orElseThrow();
    }

    public void delete(Long id) {
        storeRepository.deleteById(id);
    }

    public void update(Long id, StoreDTO storeDTO) {
        Store store = getStore(id);
        store.setStoreTitle(storeDTO.storeTitle());
        store.setCountry(storeDTO.country());
        storeRepository.save(store);
    }
}
