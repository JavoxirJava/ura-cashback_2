package itca.uz.ura_cashback_2.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDto {
    private String phoneNumber;
    private String password;
}
