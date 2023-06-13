package com.example.thd_test.service;

import com.example.thd_test.dto.date.TimeDTO;
import com.example.thd_test.model.date.Time;
import com.example.thd_test.repos.TimeRepository;
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
public class TimeService {
    private final TimeRepository timeRepository;
    private final DateService dateService;
    @PersistenceContext
    private final EntityManager entityManager;

    public List<Time> findByParams(
            Integer hour, Integer minute, Long dateId
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Time> query = cb.createQuery(Time.class);
        Root<Time> root = query.from(Time.class);
        List<Predicate> predicates = new ArrayList<>();
        if (hour != null) {
            predicates.add(cb.equal(root.get("hour"), hour));
        }
        if (minute != null) {
            predicates.add(cb.equal(root.get("minute"), minute));
        }
        if (dateId != null) {
            predicates.add(cb.equal(root.get("date"), dateId));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query).getResultList();
    }

    public List<Time> findAllTimes() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return timeRepository.findAll(byId);
    }

    public void save(TimeDTO timeDTO) {
        Time time = Time.builder()
                .hour(timeDTO.hour())
                .minute(timeDTO.minute())
                .date(dateService.getDate(timeDTO.dateId()))
                .build();
        timeRepository.save(time);
    }

    public void delete(Long id) {
        timeRepository.deleteById(id);
    }

    public Time getTime(Long id) {
        return timeRepository.findById(id).orElseThrow();
    }

    public void update(Long id, TimeDTO timeDTO) {
        Time time = getTime(id);
        time.setHour(timeDTO.hour());
        time.setMinute(timeDTO.minute());
        time.setDate(dateService.getDate(timeDTO.dateId()));
        timeRepository.save(time);
    }
}
