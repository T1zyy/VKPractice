package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tradehub.backend.model.transaction.IncomeTransaction;
import tradehub.backend.service.TransactionService;

@RestController
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/transaction")
    public void makeTransaction(@Valid @RequestBody IncomeTransaction transaction) {
        transactionService.newTransaction(transaction);
    }
}
