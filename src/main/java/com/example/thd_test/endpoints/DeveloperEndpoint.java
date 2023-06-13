package com.example.thd_test.endpoints;

import com.example.thd_test.dto.game.DeveloperDTO;
import com.example.thd_test.dto.game.PublisherDTO;
import com.example.thd_test.model.game.Developer;
import com.example.thd_test.service.DeveloperService;
import com.example.thd_test.service.PublisherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/developers")
public class DeveloperEndpoint {
    private final DeveloperService developerService;

    @GetMapping("/all")
    public ResponseEntity<List<Developer>> all(
            @RequestParam(required = false, name = "devTitle") String devTitle,
            @RequestParam(required = false, name = "country") String country,
            @RequestParam(required = false, name = "devEmployeeNumber") Integer devEmployeeNumber,
            @RequestParam(required = false, name = "price") Double price,
            @RequestParam(required = false, name = "genre") String genre,
            @RequestParam(required = false, name = "score") Integer score,
            @RequestParam(required = false, name = "storeTitle") String storeTitle,
            @RequestParam(required = false, name = "ram") Integer ram
    ) {
        return ResponseEntity.ok(developerService.findByParams(devTitle, country, devEmployeeNumber,
                price, genre, score, storeTitle, ram));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Developer>> add(@RequestBody @Valid DeveloperDTO devDTO) {
        developerService.save(devDTO);
        return ResponseEntity.ok(developerService.findAllDevs());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        developerService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid DeveloperDTO devDTO) {
        developerService.update(id, devDTO);
    }
}
