package com.example.thd_test.endpoints;

import com.example.thd_test.dto.StoreDTO;
import com.example.thd_test.model.Store;
import com.example.thd_test.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stores")
@RequiredArgsConstructor
public class StoreEndpoint {
    private final StoreService storeService;

    @GetMapping("/all")
    public ResponseEntity<List<Store>> all(
            @RequestParam(required = false, name = "storeTitle") String storeTitle,
            @RequestParam(required = false, name = "country") String country
    ) {
        return ResponseEntity.ok(storeService.findByParams(storeTitle, country));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Store>> add(@RequestBody @Valid StoreDTO storeDTO) {
        storeService.save(storeDTO);
        return ResponseEntity.ok(storeService.findAllStores());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        storeService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid StoreDTO storeDTO) {
        storeService.update(id, storeDTO);
    }
}
