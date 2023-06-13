package com.example.thd_test.endpoints;

import com.example.thd_test.dto.game.PublisherDTO;
import com.example.thd_test.model.game.Publisher;
import com.example.thd_test.service.PublisherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/publishers")
@RequiredArgsConstructor
public class PublisherEndpoint {
    private final PublisherService publisherService;

    @GetMapping("/all")
    public ResponseEntity<List<Publisher>> all(
            @RequestParam(required = false, name = "pubTitle") String pubTitle,
            @RequestParam(required = false, name = "country") String country,
            @RequestParam(required = false, name = "pubEmployeeNumber") Integer pubEmployeeNumber
    ) {
        return ResponseEntity.ok(publisherService.findByParams(pubTitle, country, pubEmployeeNumber));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Publisher>> add(@RequestBody @Valid PublisherDTO pubDTO) {
        publisherService.save(pubDTO);
        return ResponseEntity.ok(publisherService.findAllPubs());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        publisherService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid PublisherDTO pubDTO) {
        publisherService.update(id, pubDTO);
    }
}
