package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tradehub.backend.model.advertisement.CreateAdvertisement;
import tradehub.backend.model.transaction.IncomeTransaction;
import tradehub.backend.model.transaction.Replenishment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transaction")
@NoArgsConstructor
@Setter
@Getter
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

    public Transaction(Replenishment replenishment) {
        this.receiverId = replenishment.getUserId();
        this.amount = replenishment.getAmount();
        this.madeAt = LocalDateTime.now();
        this.senderId = replenishment.getUserId();
    }
}
