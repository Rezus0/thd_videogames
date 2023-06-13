package com.example.thd_test.service;

import com.example.thd_test.dto.game.PublisherDTO;
import com.example.thd_test.model.game.Publisher;
import com.example.thd_test.repos.PublisherRepository;
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
public class PublisherService {
    private final PublisherRepository publisherRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Publisher> findByParams(String pubTitle, String country, Integer pubEmployeeNumber) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Publisher> query = cb.createQuery(Publisher.class);
        Root<Publisher> root = query.from(Publisher.class);
        List<Predicate> predicates = new ArrayList<>();
        if (pubTitle != null) {
            predicates.add(cb.equal(root.get("pubTitle"), pubTitle));
        }
        if (country != null) {
            predicates.add(cb.equal(root.get("country"), country));
        }
        if (pubEmployeeNumber != null) {
            predicates.add(cb.equal(root.get("pubEmployeeNumber"), pubEmployeeNumber));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(PublisherDTO pubDTO) {
        Publisher publisher = Publisher.builder()
                .pubTitle(pubDTO.pubTitle())
                .country(pubDTO.country())
                .pubEmployeeNumber(pubDTO.pubEmployeeNumber())
                .build();
        publisherRepository.save(publisher);
    }

    public List<Publisher> findAllPubs() {
        return publisherRepository.findAll();
    }

    public Publisher getPublisher(Long id) {
        return publisherRepository.findById(id).orElseThrow();
    }

    public void delete(Long id) {
        publisherRepository.deleteById(id);
    }

    public void update(Long id, PublisherDTO pubDTO) {
        Publisher publisher = getPublisher(id);
        publisher.setPubTitle(pubDTO.pubTitle());
        publisher.setCountry(pubDTO.country());
        publisher.setPubEmployeeNumber(pubDTO.pubEmployeeNumber());
        publisherRepository.save(publisher);
    }
}
