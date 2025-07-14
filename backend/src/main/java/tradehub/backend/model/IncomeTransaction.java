package tradehub.backend.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class IncomeTransaction {
    private final Long senderId;
    private final Long receiverId;
    private final BigDecimal amount;
}
