package com.example.thd_test.endpoints;

import com.example.thd_test.dto.game.SystemRequirementDTO;
import com.example.thd_test.model.game.SystemRequirement;
import com.example.thd_test.service.SystemRequirementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sys-req")
@RequiredArgsConstructor
public class SystemRequirementEndpoint {
    private final SystemRequirementService requirementService;
    @GetMapping("/all")
    public ResponseEntity<List<SystemRequirement>> all(
            @RequestParam(required = false, name = "os") String os,
            @RequestParam(required = false, name = "gpu") String gpu,
            @RequestParam(required = false, name = "ram") Integer ram,
            @RequestParam(required = false, name = "requiredSpace") Integer requiredSpace,
            @RequestParam(required = false, name = "processor") String processor
    ) {
        return ResponseEntity.ok(requirementService.findByParams(os, gpu, ram, requiredSpace, processor));
    }

    @PostMapping("/add")
    public ResponseEntity<List<SystemRequirement>> add(
            @RequestBody @Valid SystemRequirementDTO requirementDTO
    ) {
        requirementService.save(requirementDTO);
        return ResponseEntity.ok(requirementService.findAllReqs());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        requirementService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(
            @PathVariable(name = "id") Long id,
            @RequestBody @Valid SystemRequirementDTO requirementDTO
    ) {
        requirementService.update(id, requirementDTO);
    }

}
