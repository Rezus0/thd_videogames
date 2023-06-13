package com.example.thd_test.endpoints;

import com.example.thd_test.dto.relations.SoldGameDTO;
import com.example.thd_test.model.relations.SoldGame;
import com.example.thd_test.service.SoldGameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sold_games")
public class SoldGameEndpoint {
    private final SoldGameService soldGameService;
    @GetMapping("/all")
    public ResponseEntity<List<SoldGame>> all(
            @RequestParam(required = false, name = "gameId") Long gameId,
            @RequestParam(required = false, name = "storeId") Long storeId,
            @RequestParam(required = false, name = "price") Double price
    ) {
        return ResponseEntity.ok(soldGameService.findByParams(gameId, storeId, price));
    }

    @PostMapping("/add")
    public ResponseEntity<List<SoldGame>> add(@RequestBody @Valid SoldGameDTO gameDTO) {
        soldGameService.save(gameDTO);
        return ResponseEntity.ok(soldGameService.findAllSoldGames());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        soldGameService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid SoldGameDTO gameDTO) {
        soldGameService.update(id, gameDTO);
    }
}
