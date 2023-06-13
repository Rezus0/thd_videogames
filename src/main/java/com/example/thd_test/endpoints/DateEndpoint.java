package com.example.thd_test.endpoints;

import com.example.thd_test.dto.date.DateDTO;
import com.example.thd_test.model.date.Date;
import com.example.thd_test.service.DateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/date")
@RequiredArgsConstructor
public class DateEndpoint {
    private final DateService dateService;

    @GetMapping("/all")
    public ResponseEntity<List<Date>> all(
            @RequestParam(required = false, name = "day") Integer day,
            @RequestParam(required = false, name = "month") Integer month,
            @RequestParam(required = false, name = "year") Integer year
    ) {
        return ResponseEntity.ok(dateService.findByParams(day, month, year));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Date>> add(@RequestBody @Valid DateDTO dateDTO) {
        dateService.save(dateDTO);
        return ResponseEntity.ok(dateService.findAllDates());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        dateService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid DateDTO dateDTO) {
        dateService.update(id, dateDTO);
    }
}
