package com.example.thd_test.service;

import com.example.thd_test.dto.game.SystemRequirementDTO;
import com.example.thd_test.model.game.SystemRequirement;
import com.example.thd_test.repos.SystemRequirementRepository;
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
public class SystemRequirementService {
    private final SystemRequirementRepository requirementRepository;
    @PersistenceContext
    private final EntityManager entityManager;
    public List<SystemRequirement> findAllReqs() {
        Sort byId = Sort.by(Sort.Direction.ASC, "id");
        return requirementRepository.findAll(byId);
    }

    public void save(SystemRequirementDTO requirementDTO) {
        SystemRequirement requirement = SystemRequirement.builder()
                .gpu(requirementDTO.gpu())
                .os(requirementDTO.os())
                .ram(requirementDTO.ram())
                .processor(requirementDTO.processor())
                .requiredSpace(requirementDTO.requiredSpace())
                .build();
        requirementRepository.save(requirement);
    }

    public SystemRequirement getReq(Long id) {
        return requirementRepository.findById(id).orElseThrow();
    }

    public void delete(Long id) {
        requirementRepository.deleteById(id);
    }

    public void update(Long id, SystemRequirementDTO requirementDTO) {
        SystemRequirement requirement = getReq(id);
        requirement.setRequiredSpace(requirementDTO.requiredSpace());
        requirement.setRam(requirementDTO.ram());
        requirement.setOs(requirementDTO.os());
        requirement.setProcessor(requirementDTO.processor());
        requirement.setGpu(requirementDTO.gpu());
        requirementRepository.save(requirement);
    }

    public List<SystemRequirement> findByParams(
            String os, String gpu, Integer ram, Integer requiredSpace, String processor
    ) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<SystemRequirement> query = cb.createQuery(SystemRequirement.class);
        Root<SystemRequirement> root = query.from(SystemRequirement.class);
        List<Predicate> predicates = new ArrayList<>();
        if (os != null) {
            predicates.add(cb.equal(root.get("os"), os));
        }
        if (gpu != null) {
            predicates.add(cb.equal(root.get("gpu"), gpu));
        }
        if (ram != null) {
            predicates.add(cb.equal(root.get("ram"), ram));
        }
        if (requiredSpace != null) {
            predicates.add(cb.equal(root.get("requiredSpace"), requiredSpace));
        }
        if (processor != null) {
            predicates.add(cb.equal(root.get("processor"), processor));
        }
        query.select(root).where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("id")));
        return entityManager.createQuery(query) .getResultList();
    }
}
