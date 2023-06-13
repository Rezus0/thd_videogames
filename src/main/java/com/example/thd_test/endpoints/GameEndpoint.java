package com.example.thd_test.endpoints;

import com.example.thd_test.dto.game.GameDTO;
import com.example.thd_test.model.game.Game;
import com.example.thd_test.model.game.SystemRequirement;
import com.example.thd_test.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/games")
public class GameEndpoint {
    private final GameService gameService;
    @GetMapping("/all")
    public ResponseEntity<List<Game>> all(
            @RequestParam(required = false, name = "gameTitle") String gameTitle,
            @RequestParam(required = false, name = "genre") String genre,
            @RequestParam(required = false, name = "score") Integer score,
            @RequestParam(required = false, name = "minReqId") Long minReqId,
            @RequestParam(required = false, name = "recReqId") Long recReqId,
            @RequestParam(required = false, name = "requiredSpace") Integer requiredSpace,
            @RequestParam(required = false, name = "year") Integer year
    ) {
        return ResponseEntity.ok(gameService.findByParams(gameTitle, genre, score, minReqId,
                recReqId, requiredSpace, year));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Game>> add(@RequestBody @Valid GameDTO game) {
        gameService.save(game);
        return ResponseEntity.ok(gameService.findAllGames());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        gameService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid GameDTO game) {
        gameService.update(id, game);
    }

}
