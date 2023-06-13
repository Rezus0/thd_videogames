package com.example.thd_test.endpoints;

import com.example.thd_test.dto.user.UserAuthDataDTO;
import com.example.thd_test.model.user.UserAuthData;
import com.example.thd_test.service.UserAuthDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth-data")
public class UserAuthDataEndpoint {
    private final UserAuthDataService dataService;

    @GetMapping("/all")
    public ResponseEntity<List<UserAuthData>> all(
            @RequestParam(required = false, name = "userId") Long userId,
            @RequestParam(required = false, name = "login") String login,
            @RequestParam(required = false, name = "password") String password
    ) {
        return ResponseEntity.ok(dataService.findByParams(userId, login, password));
    }

    @PostMapping("/add")
    public ResponseEntity<List<UserAuthData>> add(@RequestBody @Valid UserAuthDataDTO dataDTO) {
        dataService.save(dataDTO);
        return ResponseEntity.ok(dataService.findAllData());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        dataService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid UserAuthDataDTO dataDTO) {
        dataService.update(id, dataDTO);
    }
}
