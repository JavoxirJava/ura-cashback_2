package itca.uz.ura_cashback_2.payload;

import lombok.Data;

import java.util.UUID;

@Data
public class ReqPassword {
    private UUID userId;

    private String joriyPassword;

    private String password;

    private String prePassword;

}
