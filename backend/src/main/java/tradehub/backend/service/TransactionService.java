package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tradehub.backend.entity.Transaction;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.model.transaction.IncomeTransaction;
import tradehub.backend.repository.TransactionRepository;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserService userService;

    @Transactional
    public void newTransaction(IncomeTransaction incomeTransaction) {
        var transaction = new Transaction(incomeTransaction);
        transactionRepository.save(transaction);
    }

    @Transactional
    protected void makeTransaction(IncomeTransaction incomeTransaction) {
        UserEntity sender = userService.getUserById(incomeTransaction.getSenderId());
        UserEntity receiver = userService.getUserById(incomeTransaction.getReceiverId());

        if (sender.getBalance().compareTo(incomeTransaction.getAmount()) < 0) {
            throw new IllegalStateException("Not enough balance");
        }

        sender.setBalance(sender.getBalance().subtract(incomeTransaction.getAmount()));
        receiver.setBalance(receiver.getBalance().add(incomeTransaction.getAmount()));
        userService.saveUser(sender);
        userService.saveUser(receiver);
    }
}
