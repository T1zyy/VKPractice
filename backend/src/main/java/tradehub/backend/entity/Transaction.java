package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import tradehub.backend.model.IncomeTransaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long senderId;
    @Column(nullable = false)
    private Long receiverId;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private LocalDateTime madeAt;

    public Transaction(IncomeTransaction incomeTransaction) {
        this.senderId = incomeTransaction.getSenderId();
        this.receiverId = incomeTransaction.getReceiverId();
        this.amount = incomeTransaction.getAmount();
        this.madeAt = LocalDateTime.now();
    }
}
