package itca.uz.ura_cashback_2.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDto {
    private UUID id;
    private String comment;
    private UUID clientId;
    private Double cash_price;
    private Double cashback;
}
