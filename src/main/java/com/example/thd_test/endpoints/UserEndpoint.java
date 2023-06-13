package com.example.thd_test.endpoints;

import com.example.thd_test.dto.user.UserDTO;
import com.example.thd_test.model.user.User;
import com.example.thd_test.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserEndpoint {
    private final UserService userService;
    @GetMapping("/all")
    public ResponseEntity<List<User>> all(
            @RequestParam(required = false, name = "nickname") String nickname,
            @RequestParam(required = false, name = "balance") Double balance,
            @RequestParam(required = false, name = "regTimeId") Long regTimeId,
            @RequestParam(required = false, name = "country") String country,
            @RequestParam(required = false, name = "gameDataLevel") Integer gameDataLevel,
            @RequestParam(required = false, name = "gameDataPlaytime") Double gameDataPlaytime,
            @RequestParam(required = false, name = "storeTitle") String storeTitle,
            @RequestParam(required = false, name = "price") Double price,
            @RequestParam(required = false, name = "genre") String genre
    ) {
        return ResponseEntity.ok(userService.findByParams(nickname, balance, regTimeId,
                country, gameDataLevel, gameDataPlaytime, storeTitle, price, genre));
    }

    @PostMapping("/add")
    public ResponseEntity<List<User>> add(@RequestBody @Valid UserDTO userDTO) {
        userService.save(userDTO);
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        userService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid UserDTO userDTO) {
        userService.update(id, userDTO);
    }
}
