package com.example.thd_test.endpoints;

import com.example.thd_test.dto.date.TimeDTO;
import com.example.thd_test.model.date.Time;
import com.example.thd_test.service.TimeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/time")
public class TimeEndpoint {
    private final TimeService timeService;
    @GetMapping("/all")
    public ResponseEntity<List<Time>> all(
            @RequestParam(required = false, name = "hour") Integer hour,
            @RequestParam(required = false, name = "minute") Integer minute,
            @RequestParam(required = false, name = "dateId") Long dateId
    ) {
        return ResponseEntity.ok(timeService.findByParams(hour, minute, dateId));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Time>> add(@RequestBody @Valid TimeDTO timeDTO) {
        timeService.save(timeDTO);
        return ResponseEntity.ok(timeService.findAllTimes());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        timeService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid TimeDTO timeDTO) {
        timeService.update(id, timeDTO);
    }
}
