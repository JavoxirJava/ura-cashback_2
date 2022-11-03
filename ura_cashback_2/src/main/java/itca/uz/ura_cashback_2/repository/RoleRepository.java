package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.Role;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findRoleByRoleName(RoleName roleUser);


}
