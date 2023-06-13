package com.example.thd_test.endpoints;

import com.example.thd_test.dto.game.GameDTO;
import com.example.thd_test.dto.user.UserGameDataDTO;
import com.example.thd_test.model.game.Game;
import com.example.thd_test.model.user.UserGameData;
import com.example.thd_test.service.UserGameDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/game-data")
@RequiredArgsConstructor
public class UserGameDataEndpoint {
    private final UserGameDataService dataService;
    
    @GetMapping("/all")
    public ResponseEntity<List<UserGameData>> all(
            @RequestParam(required = false, name = "userId") Long userId,
            @RequestParam(required = false, name = "gameId") Long gameId,
            @RequestParam(required = false, name = "level") Integer level,
            @RequestParam(required = false, name = "playtime") Double playtime
    ) {
        return ResponseEntity.ok(dataService.findByParams(userId, gameId, level, playtime));
    }

    @PostMapping("/add")
    public ResponseEntity<List<UserGameData>> add(@RequestBody @Valid UserGameDataDTO dataDTO) {
        dataService.save(dataDTO);
        return ResponseEntity.ok(dataService.findAllData());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        dataService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid UserGameDataDTO dataDTO) {
        dataService.update(id, dataDTO);
    }
}
