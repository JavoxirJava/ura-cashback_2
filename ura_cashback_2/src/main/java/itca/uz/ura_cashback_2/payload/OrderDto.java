package itca.uz.ura_cashback_2.payload;

import itca.uz.ura_cashback_2.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDto {
    private UUID id;
    private UUID createdBy;
    private UUID adminId;
    private User admin;
    private UUID clientId;
    private User client;
    private Double cash_price;
    private Double cashback;
    private UUID companyId;
}
