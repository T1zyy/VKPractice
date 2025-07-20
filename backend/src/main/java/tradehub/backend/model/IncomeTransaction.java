package tradehub.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeTransaction {
    private Long senderId;
    private Long receiverId;
    private BigDecimal amount;
}
