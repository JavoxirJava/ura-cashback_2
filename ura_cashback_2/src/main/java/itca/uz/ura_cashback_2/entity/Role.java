package itca.uz.ura_cashback_2.entity;

import itca.uz.ura_cashback_2.entity.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "roles")
public class Role implements GrantedAuthority {//Sanjar Bexruz Makxsud Ozodbek27
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(value = EnumType.STRING)
    private RoleName roleName;

    @Override
    public String getAuthority() {
        return roleName.name();
    }

    public Role(RoleName roleName) {
        this.roleName = roleName;
    }
}
