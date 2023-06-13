package com.example.thd_test.endpoints;

import com.example.thd_test.dto.relations.ReleasedGameDTO;
import com.example.thd_test.model.relations.ReleasedGame;
import com.example.thd_test.service.ReleasedGameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/released_games")
@RequiredArgsConstructor
public class ReleasedGameEndpoint {
    private final ReleasedGameService releasedGameService;
    @GetMapping("/all")
    public ResponseEntity<List<ReleasedGame>> all(
            @RequestParam(required = false, name = "gameId") Long gameId,
            @RequestParam(required = false, name = "pubId") Long pubId,
            @RequestParam(required = false, name = "devId") Long devId,
            @RequestParam(required = false, name = "dateId") Long dateId
    ) {
        return ResponseEntity.ok(releasedGameService.findByParams(gameId, pubId, devId, dateId));
    }

    @PostMapping("/add")
    public ResponseEntity<List<ReleasedGame>> add(@RequestBody @Valid ReleasedGameDTO gameDTO) {
        releasedGameService.save(gameDTO);
        return ResponseEntity.ok(releasedGameService.findAllReleasedGames());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        releasedGameService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid ReleasedGameDTO gameDTO) {
        releasedGameService.update(id, gameDTO);
    }
}
