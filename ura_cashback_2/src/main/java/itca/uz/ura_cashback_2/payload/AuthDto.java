package itca.uz.ura_cashback_2.payload;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.Role;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
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

    private String password;

    private String prePassword;

    private List<Company> company;

    private List<Role> roles;

    public AuthDto(UUID id, String firstName, String lastName, String phoneNumber, String email, Double salary, String password, List<Company> company, List<Role> roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.salary = salary;
        this.password = password;
        this.company = company;
        this.roles = roles;
    }

}
