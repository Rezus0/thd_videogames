package com.example.thd_test.endpoints;

import com.example.thd_test.dto.relations.SoldGameDTO;
import com.example.thd_test.dto.user.PurchaseDTO;
import com.example.thd_test.model.relations.SoldGame;
import com.example.thd_test.model.user.Purchase;
import com.example.thd_test.service.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/purchase")
@RequiredArgsConstructor
public class PurchaseEndpoint {
    private final PurchaseService purchaseService;
    @GetMapping("/all")
    public ResponseEntity<List<Purchase>> all(
            @RequestParam(required = false, name = "soldGameId") Long soldGameId,
            @RequestParam(required = false, name = "userId") Long userId,
            @RequestParam(required = false, name = "timeId") Long timeId
    ) {
        return ResponseEntity.ok(purchaseService.findByParams(soldGameId, userId, timeId));
    }

    @PostMapping("/add")
    public ResponseEntity<List<Purchase>> add(@RequestBody @Valid PurchaseDTO purchaseDTO) {
        purchaseService.save(purchaseDTO);
        return ResponseEntity.ok(purchaseService.findAllPurchases());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Long id) {
        purchaseService.delete(id);
    }

    @PostMapping("/update/{id}")
    public void update(@PathVariable(value = "id") Long id,
                       @RequestBody @Valid PurchaseDTO purchaseDTO) {
        purchaseService.update(id, purchaseDTO);
    }
}
