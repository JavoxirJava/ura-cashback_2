package itca.uz.ura_cashback_2.payload;

import itca.uz.ura_cashback_2.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {

    private UUID id;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String email;

    private Double salary;

    private boolean active;

    private String password;

    private String prePassword;

    private UUID companyId;

    private List<Role> roles;



}
