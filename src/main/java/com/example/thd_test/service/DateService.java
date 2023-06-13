package com.example.thd_test.service;

import com.example.thd_test.dto.date.DateDTO;
import com.example.thd_test.model.date.Date;
import com.example.thd_test.repos.DateRepository;
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
public class DateService {
    private final DateRepository dateRepository;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Date> findByParams(Integer day, Integer month, Integer year) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Date> query = cb.createQuery(Date.class);
        Root<Date> root = query.from(Date.class);
        List<Predicate> predicates = new ArrayList<>();
        if (day != null) {
            predicates.add(cb.equal(root.get("day"), day));
        }
        if (month != null) {
            predicates.add(cb.equal(root.get("month"), month));
        }
        if (year != null) {
            predicates.add(cb.equal(root.get("year"), year));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public void save(DateDTO dateDTO) {
        Date date = Date.builder()
                .day(dateDTO.day())
                .month(dateDTO.month())
                .year(dateDTO.year())
                .build();
        dateRepository.save(date);
    }

    public List<Date> findAllDates() {
        return dateRepository.findAll();
    }

    public Date getDate(Long id) {
        return dateRepository.findById(id).orElseThrow();
    }

    public void delete(Long id) {
        dateRepository.deleteById(id);
    }

    public void update(Long id, DateDTO dateDTO) {
        Date date = getDate(id);
        date.setDay(dateDTO.day());
        date.setMonth(dateDTO.month());
        date.setYear(dateDTO.year());
        dateRepository.save(date);
    }
}
